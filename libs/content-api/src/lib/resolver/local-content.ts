import { getPageUrl } from '@watheia/content-helpers';
import type { Model, PageEntry, types } from '@watheia/content-model';
import { ContentCache, LocalContentSchema } from '../content-api.types';
import { readDirRecursively } from './file-reader';

function getReferenceFields(models: Model[]) {
  const referenceFields: Record<string, boolean> = {};
  models.forEach((model) => {
    model.fields?.forEach((field) => {
      if (
        field.type === 'reference' ||
        (field.type === 'list' && field.items?.type === 'reference')
      ) {
        referenceFields[model.name + ':' + field.name] = true;
      }
    });
  });

  return referenceFields;
}

export function resolveContent(schema: LocalContentSchema): ContentCache {
  const allReferenceFields = getReferenceFields(schema.models);
  const documentsById = readDirRecursively(schema.rootPath, schema.contentDirs);

  function isRefField(modelName: string, fieldName: string) {
    return !!allReferenceFields[modelName + ':' + fieldName];
  }

  function getModelByName(name: string): Model {
    const model = schema.models.find((m) => m.name === name);
    if (!model) throw Error(`Could not locate model named: ${name}`);
    if (model.name !== name) throw Error(`Model name/key mismatch found for: ${name}`);
    return model;
  }

  function normalizeData(content: any, filePath: string) {
    if (!content || !content.type) return;

    const model = getModelByName(content.type);
    // One-time model metadata decoration
    if (!content.__metadata) {
      if (model.type === 'data') {
        content.__metadata = { id: filePath, modelType: 'data' };
      } else if (model.type === 'page') {
        content.__metadata = { id: filePath, modelType: 'page', urlPath: getPageUrl(content) };
      } else if (model.type === 'object') {
        content.__metadata = { modelType: 'object' };
      }
    }

    for (const fieldName in content) {
      const fieldValue = content[fieldName];
      if (!fieldValue) continue;

      const isRef = isRefField(model.name, fieldName);
      if (Array.isArray(fieldValue)) {
        if (fieldValue.length === 0) continue;
        if (isRef && typeof fieldValue[0] === 'string') {
          content[fieldName] = fieldValue.map((filename) => documentsById[filename]);
        }
        if (typeof fieldValue[0] === 'object') {
          fieldValue.forEach((o) => normalizeData(o, filePath));
        }
      } else {
        if (isRef && typeof fieldValue === 'string') {
          content[fieldName] = documentsById[fieldValue];
        }
        if (typeof fieldValue === 'object') {
          normalizeData(fieldValue, filePath);
        }
      }
    }

    return content;
  }

  Object.entries(documentsById).forEach(([filePath, data]) => normalizeData(data, filePath));

  const objects = Object.values(documentsById);
  const pages = objects.filter((o) => o.__metadata.modelType === 'page') as PageEntry[];
  const site = objects.find(({ type }) => type === 'Config') as types.Config;

  return { objects, pages, props: { site }, schema };
}
