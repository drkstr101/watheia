import artisanalName from '@stackbit/artisanal-names';
import fse from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { DataModel, PageModel, isDataModel, isPageModel } from '@stackbit/sdk';
import { deepMap } from '@stackbit/utils';
import {
  Asset,
  Assets,
  Document,
  DocumentField,
  DocumentFieldBaseProps,
  DocumentFieldSpecificProps,
  DocumentListFieldItems,
  Field,
  FieldSpecificProps,
  Logger,
  Model,
} from '@watheia/content-model';
import {
  extractTokensAndValuesFromFilePath,
  extractTokensFromString,
  getFileDates,
  interpolatePath,
} from '../utils';

export const SLUG_FIELD_PREFIX = '_filePath_';

const ASSET_ID_PREFIX = 'stackbit_asset_id';

type Context = {
  /** The document/asset file path relative to project directory. */
  filePath: string;
};

export type DocumentContext = Context;
export type AssetContext = Context;

export function isPrefixedAssetId(assetId: unknown) {
  return typeof assetId === 'string' && assetId.startsWith(ASSET_ID_PREFIX + ':');
}

export function getAssetDir(assetsConfig: Assets): string {
  return assetsConfig.referenceType === 'static'
    ? assetsConfig.staticDir
    : assetsConfig.assetsDir;
}

/**
 * @param assetFilePath Asset file path relative to {@link Assets.staticDir} or {@link Assets.assetsDir}.
 * @param referenceType The {@link Assets.referenceType}.
 */
function getAssetId({
  assetFilePath,
  referenceType,
}: {
  assetFilePath: string;
  referenceType: Assets['referenceType'];
}) {
  return `${ASSET_ID_PREFIX}:${referenceType}:${assetFilePath}`;
}

/**
 * Computes the field value from the asset ID.
 *
 * For "static" referenceType assets, the reference to the asset is stored
 * relative to the {@link Assets.staticDir} prefixed by {@link Assets.publicPath}.
 * For example, if the assetConfig is:
 * ```js
 * {
 *     referenceType: 'static',
 *     staticDir: 'public',
 *     publicPath: '/assets'
 * }
 * ```
 * and the asset file is located at public/images/example.png, then the stored
 * value will be '/assets/images/example.png'.
 *
 * For "relative" referenceType assets, the reference to the asset is stored
 * relative to the document containing the asset. For example, if the document
 * containing the asset is located at content/pages/page.md, and it references an
 * asset located at content/images/example.png, then the stored field value will
 * be '../images/example.png'.
 *
 * @param assetId The asset ID in ASSET_ID_PREFIX:REFERENCE_TYPE:ASSET_FILE_PATH format.
 *   The ASSET_FILE_PATH is relative to project folder.
 * @param documentDir The directory of the document containing the asset.
 * @param assetsConfig The {@link Assets.referenceType}.
 */
export function assetIdToAssetValue(
  assetId: string,
  documentDir: string | null,
  assetsConfig: Assets
): string {
  const [, assetReferenceType, ...assetFilePathParts] = assetId.split(':');
  const assetFilePath = assetFilePathParts.join('');
  if (assetReferenceType === 'static') {
    const staticDir = _.trim(assetsConfig.staticDir, '/');
    return path.join(assetsConfig.publicPath ?? '', path.relative(staticDir, assetFilePath));
  } else {
    if (!documentDir) {
      // When creating documents, the document file path isn't known.
      // Return the assetId as-is, then iterate over the data again
      // using replaceAssetIdsWithAssetValues replacing assetIds with
      // the actual value.
      return assetId;
    }
    return path.relative(documentDir, assetFilePath);
  }
}

export function replaceAssetIdsWithAssetValues(
  data: any,
  documentDir: string,
  assetsConfig?: Assets
): any {
  if (!assetsConfig || assetsConfig.referenceType !== 'relative') {
    return data;
  }
  return deepMap(data, (value) => {
    if (isPrefixedAssetId(value)) {
      return assetIdToAssetValue(value, documentDir, assetsConfig);
    }
    return value;
  });
}

/**
 * Inverse function to assetIdToAssetValue
 *
 * @param value The stored asset value
 * @param documentDir The directory of the document containing the asset.
 * @param assetsConfig The {@link Assets.referenceType}.
 */
export function assetValueToAssetId(
  value: string,
  documentDir: string,
  assetsConfig: Assets
): string {
  if (assetsConfig.referenceType === 'static') {
    if (value.startsWith(assetsConfig.publicPath)) {
      value = value.substring(assetsConfig.publicPath.length);
      value = _.trim(value, '/');
    }
    return getAssetId({
      assetFilePath: path.join(assetsConfig.staticDir, value),
      referenceType: assetsConfig.referenceType,
    });
  } else {
    const assetFilePath = path.join(documentDir, value);
    return getAssetId({
      assetFilePath: assetFilePath,
      referenceType: assetsConfig.referenceType,
    });
  }
}

/**
 * @param assetFilePath Asset file path relative to project directory.
 * @param absAssetFilePath Absolute asset file path.
 * @param assetsConfig The {@link Assets} config.
 */
export async function convertAsset({
  assetFilePath,
  absProjectDir,
  assetsConfig,
}: {
  assetFilePath: string;
  absProjectDir: string;
  assetsConfig: Assets;
}): Promise<Asset<AssetContext>> {
  const absAssetFilePath = path.join(absProjectDir, assetFilePath);
  const stats = await fse.stat(absAssetFilePath);
  const displayName = path.basename(absAssetFilePath);
  return {
    type: 'asset',
    id: getAssetId({
      assetFilePath: assetFilePath,
      referenceType: assetsConfig.referenceType,
    }),
    context: {
      filePath: assetFilePath,
    },
    ...(await getFileDates(absAssetFilePath)),
    manageUrl: '',
    status: 'published',
    fields: {
      file: {
        dimensions: {},
        type: 'assetFile',
        url: assetFilePath,
        fileName: displayName,
        size: stats.size,
      },
      title: {
        type: 'string',
        value: displayName,
      },
    },
  };
}

type GetModelByName = (modelName: string) => Model<unknown> | undefined;

export async function convertDocument(options: {
  filePath: string;
  fullFilePath: string;
  data: any;
  getModelByName: GetModelByName;
  assetsConfig?: Assets;
  fileIdKey?: string;
  logger: Logger;
}): Promise<Document<DocumentContext> | null> {
  const { filePath, fullFilePath, data, getModelByName, assetsConfig, fileIdKey } = options;
  const { type, ...fields } = data;
  const model: Model | undefined = getModelByName(type);
  if (!model) {
    return null;
  }
  const documentFields = convertFields({
    dataFields: fields,
    modelFields: model.fields ?? [],
    getModelByName,
    assetsConfig,
    docFilePath: filePath,
    docFieldPath: [],
    logger: options.logger,
  });
  if (
    (isPageModel(model) || isDataModel(model)) &&
    model.filePath &&
    typeof model.filePath === 'string'
  ) {
    const slugTemplate = getSlugTemplate(model, model.filePath, path.dirname(filePath));
    const tokensAndValues = extractTokensAndValuesFromFilePath(filePath, slugTemplate);
    for (const [token, value] of Object.entries(tokensAndValues)) {
      // only extract values for virtual slug fields
      if (documentFields[token]) {
        continue;
      }
      documentFields[createVirtualSlugFieldName(token)] = {
        type: 'slug',
        value: value || '/',
      };
    }
  }
  return {
    type: 'document',
    id: fileIdKey ? data[fileIdKey] ?? filePath : filePath,
    modelName: model.name,
    manageUrl: '',
    status: 'published',
    context: {
      filePath,
    },
    ...(await getFileDates(fullFilePath)),
    fields: documentFields,
  };
}

function convertFields({
  dataFields,
  modelFields,
  getModelByName,
  assetsConfig,
  docFilePath,
  docFieldPath,
  logger,
}: {
  dataFields: Record<string, any>;
  modelFields: Field[];
  getModelByName: GetModelByName;
  assetsConfig?: Assets;
  docFilePath: string;
  docFieldPath: (string | number)[];
  logger: Logger;
}): Record<string, DocumentField> {
  const result: Record<string, DocumentField> = {};
  for (const [fieldName, fieldValue] of Object.entries(dataFields)) {
    const modelField = (modelFields ?? []).find(
      (modelField: Field) => modelField.name === fieldName
    );
    if (!modelField || _.isNil(fieldValue)) {
      continue;
    }
    const documentField = convertFieldType({
      fieldValue,
      modelField,
      getModelByName,
      assetsConfig,
      docFilePath,
      docFieldPath: docFieldPath.concat(fieldName),
      logger,
    });
    if (documentField) {
      result[fieldName] = documentField;
    }
  }
  return result;
}

function convertFieldType({
  fieldValue,
  modelField,
  getModelByName,
  assetsConfig,
  docFilePath,
  docFieldPath,
  logger,
}: {
  fieldValue: any;
  modelField: Field | FieldSpecificProps;
  getModelByName: GetModelByName;
  assetsConfig?: Assets;
  docFilePath: string;
  docFieldPath: (string | number)[];
  logger: Logger;
}): DocumentField | undefined {
  function errorMessage(message: string) {
    return `Error converting value in file '${docFilePath}' at field path '${docFieldPath.join(
      '.'
    )}' of declared type '${modelField.type}'. ${message}`;
  }
  const localized = !!('localized' in modelField && modelField.localized);
  switch (modelField.type) {
    case 'string':
    case 'url':
    case 'slug':
    case 'text':
    case 'markdown':
    case 'html':
    case 'number':
    case 'boolean':
    case 'date':
    case 'datetime':
    case 'color':
    case 'json':
    case 'richText':
    case 'file':
    case 'enum':
    case 'style': {
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: modelField.type,
        },
        specificFieldProps: (value) => ({ value }),
      });
    }
    case 'list': {
      const itemsModel = modelField.items ?? { type: 'string' };
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: 'list',
        },
        specificFieldProps: (value, locale) => {
          if (!Array.isArray(value)) {
            logger.error(errorMessage(`Value is not an array - ${value}.`));
            return;
          }
          return {
            items: _.reduce(
              value,
              (items: DocumentListFieldItems[], item, index) => {
                const documentField = convertFieldType({
                  fieldValue: item,
                  modelField: itemsModel,
                  getModelByName,
                  assetsConfig,
                  docFilePath,
                  docFieldPath: docFieldPath.concat(locale ? [locale, index] : [index]),
                  logger,
                }) as DocumentListFieldItems;
                if (!documentField) {
                  logger.error(
                    errorMessage(
                      'One of the list items could not be converted, ignoring the while list.'
                    )
                  );
                  return items;
                }
                return items.concat(documentField);
              },
              []
            ),
          };
        },
      });
    }
    case 'object': {
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: 'object',
        },
        specificFieldProps: (value, locale) => ({
          fields: convertFields({
            dataFields: value,
            modelFields: modelField.fields,
            getModelByName,
            assetsConfig,
            docFilePath,
            docFieldPath: locale ? docFieldPath.concat(locale) : docFieldPath,
            logger,
          }),
        }),
      });
    }
    case 'model': {
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: 'model',
        },
        specificFieldProps: (value, locale) => {
          const { type, ...fields } = value;
          let modelName: string;
          if (type) {
            modelName = type;
          } else if (modelField.models?.length === 1) {
            modelName = modelField.models[0]!;
          } else {
            logger.error(
              errorMessage(
                `The object doesn't have the 'type' field, and the model name cannot be inferred ` +
                  `from field's allowed models ${(modelField.models ?? []).join('.')}.`
              )
            );
            return;
          }
          const model = getModelByName(modelName);
          if (!model) {
            logger.error(errorMessage(`No model found with name: ${modelName}.`));
            return;
          }
          return {
            modelName: model.name,
            fields: convertFields({
              dataFields: fields,
              modelFields: model.fields ?? [],
              getModelByName,
              assetsConfig,
              docFilePath,
              docFieldPath: locale ? docFieldPath.concat(locale) : docFieldPath,
              logger,
            }),
          };
        },
      });
    }
    case 'cross-reference':
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: 'cross-reference',
          refType: 'document',
        },
        specificFieldProps: (value) => value,
      });
    case 'reference':
      return convertValueToDocumentField({
        fieldValue,
        localized,
        baseFieldProps: {
          type: 'reference',
          refType: 'document',
        },
        specificFieldProps: (value) => ({ refId: value }),
      });
    case 'image': {
      if (modelField.source) {
        return convertValueToDocumentField({
          fieldValue,
          localized,
          baseFieldProps: {
            type: 'image',
            source: modelField.source,
          },
          specificFieldProps: (value) => ({ sourceData: value }),
        });
      }
      if (localized) {
        return {
          type: 'reference',
          refType: 'asset',
          localized: true,
          locales: _.reduce(
            fieldValue,
            (locales, value, locale) => {
              if (typeof value !== 'string') {
                logger.error(errorMessage(`Value is not a string.`));
                return locales;
              }
              return {
                ...locales,
                [locale]: {
                  locale,
                  refId: assetsConfig
                    ? assetValueToAssetId(value, path.dirname(docFilePath), assetsConfig)
                    : value,
                },
              };
            },
            {}
          ),
        };
      }
      if (typeof fieldValue !== 'string') {
        logger.error(errorMessage(`Value is not a string.`));
        return;
      }
      const normalizedValue = fieldValue?.toLowerCase();
      if (
        normalizedValue.startsWith('http:') ||
        normalizedValue.startsWith('https:') ||
        normalizedValue.startsWith('//')
      ) {
        return {
          type: 'image',
          fields: {
            title: {
              type: 'string',
              value: fieldValue?.split('/').slice(-1)[0] || fieldValue,
            },
            url: {
              type: 'string',
              value: fieldValue,
            },
          },
        };
      }
      return {
        type: 'reference',
        refType: 'asset',
        refId: assetsConfig
          ? assetValueToAssetId(fieldValue, path.dirname(docFilePath), assetsConfig)
          : fieldValue,
      };
    }
    default: {
      logger.error('Unsupported field type: ' + (modelField as any).type);
      const _exhaustiveCheck: never = modelField;
      return _exhaustiveCheck;
    }
  }
}

function convertValueToDocumentField<
  // Type extends FieldType,
  // Base extends DocumentFieldBasePropsForType<Type>,
  // Specific extends DocumentFieldSpecificPropsForType<Type>
  Base extends DocumentFieldBaseProps,
  Specific extends DocumentFieldSpecificProps
>({
  fieldValue,
  localized,
  baseFieldProps,
  specificFieldProps,
}: {
  fieldValue: any;
  localized: boolean;
  baseFieldProps: Base;
  specificFieldProps: (value: any, locale?: string) => Specific | undefined;
}):
  | (Base & Specific) // DocumentFieldNonLocalized
  | (Base & { localized: true; locales: Record<string, { locale: string } & Specific> }) // DocumentFieldLocalized
  | undefined {
  if (localized) {
    return {
      ...baseFieldProps,
      localized: true,
      locales: _.reduce(
        fieldValue,
        (locales, value, locale) => {
          const specific = specificFieldProps(value, locale);
          if (typeof specific === 'undefined') {
            return locales;
          }
          return {
            ...locales,
            [locale]: {
              locale,
              ...specific,
            },
          };
        },
        {} as Record<string, { locale: string } & Specific>
      ),
    };
  }
  const specific = specificFieldProps(fieldValue);
  if (typeof specific === 'undefined') {
    return undefined;
  }
  return {
    ...baseFieldProps,
    ...specific,
  };
}

function getSlugTemplate(
  model: PageModel | DataModel,
  modelFilePath: string,
  contentDir: string
) {
  const extension = model.type === 'page' ? '.md' : '.json';
  return modelFilePath || `${contentDir}{slug}${extension}`;
}

export async function getFilePathFromSlugContext({
  model,
  context,
  contentDir,
  locale,
  generateFallback,
}: {
  model: PageModel | DataModel;
  context: Record<string, string>;
  contentDir: string;
  locale?: string | undefined;
  generateFallback?: boolean;
}): Promise<string | null> {
  let filePath: string | null = null;
  if (typeof model.filePath === 'function') {
    return model.filePath({
      data: context,
      model: model,
      currentLocale: locale,
    });
  } else if (model.filePath) {
    const slugTemplate = getSlugTemplate(model, model.filePath, contentDir);
    const fullContext = { ...context };
    const slugTokens = extractTokensFromString(slugTemplate);
    for (const token of slugTokens) {
      if (_.isUndefined(context[token])) {
        if (!generateFallback) {
          return null;
        }
        fullContext[token] = artisanalName.generate();
      }
    }
    filePath = interpolatePath(slugTemplate, fullContext);
    // special handling for index.md
    if (filePath === '.md' || filePath.endsWith('/.md')) {
      filePath = path.join(path.dirname(filePath), 'index.md');
    }
  }
  return filePath;
}

export function generateDocumentId() {
  return `doc.${uuid().replace(/-/g, '').slice(0, 16)}`;
}

export function getFieldNameFromVirtualSlug(fieldName: string): string {
  return fieldName.replace(new RegExp(`^${SLUG_FIELD_PREFIX}`), '');
}

export function isVirtualSlug(fieldName: string): boolean {
  return fieldName.startsWith(SLUG_FIELD_PREFIX);
}

export function createVirtualSlugFieldName(fieldName: string): string {
  return `${SLUG_FIELD_PREFIX}${fieldName}`;
}
