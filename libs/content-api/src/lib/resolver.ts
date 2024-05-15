import { globSync } from 'fast-glob';
import frontmatter from 'front-matter';
import * as fs from 'fs';
import path, { join } from 'path';
import { cwd } from 'process';

import { isDev } from '@watheia/content-helpers';
import {
  PAGE_MODEL_NAMES,
  fieldPathAttr,
  models,
  objectIdAttr,
  types,
} from '@watheia/content-model';
import { ContentApiOptions } from './content-api.types';

const contentBaseDir = 'content';
const pagesBaseDir = contentBaseDir + '/pages';

const allReferenceFields = {};
Object.values(models).forEach((model) => {
  model?.fields?.forEach((field) => {
    if (
      field.type === 'reference' ||
      (field.type === 'list' && field.items?.type === 'reference')
    ) {
      allReferenceFields[model.name + ':' + field.name] = true;
    }
  });
});

function isRefField(modelName: string, fieldName: string) {
  return !!allReferenceFields[modelName + ':' + fieldName];
}

const supportedFileTypes = ['md', 'json'];
const WORKSPACE_ROOT = process.env['WORKSPACE_ROOT'] ?? cwd();
function contentFilesInPath(dir: string) {
  const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
  return globSync(globPattern, { cwd: WORKSPACE_ROOT });
}

function readContent(file: string): types.DocumentModelType {
  const rawContent = fs.readFileSync(join(WORKSPACE_ROOT, file), 'utf8');
  let content: any = null;
  switch (path.extname(file).substring(1)) {
    case 'md':
      // eslint-disable-next-line no-case-declarations
      const parsedMd = frontmatter<Record<string, unknown>>(rawContent);
      content = {
        ...parsedMd.attributes,
        markdownContent: parsedMd.body,
      };
      break;
    case 'json':
      content = JSON.parse(rawContent);
      break;
    default:
      throw Error(`Unhandled file type: ${file}`);
  }

  content.__metadata = {
    id: file,
    modelName: content.type,
  };

  return content;
}

function resolveReferences(
  content: types.DocumentModelType,
  fileToContent: Record<string, types.DocumentModelType>
) {
  if (!content || !content.type) return;

  const modelName = content.type;
  if (!content.__metadata) content.__metadata = { modelName };

  for (const fieldName in content) {
    let fieldValue = content[fieldName];
    if (!fieldValue) continue;

    const isRef = isRefField(modelName, fieldName);
    if (Array.isArray(fieldValue)) {
      if (fieldValue.length === 0) continue;
      if (isRef && typeof fieldValue[0] === 'string') {
        fieldValue = fieldValue.map((filename) => fileToContent[filename]);
        content[fieldName] = fieldValue;
      }
      if (typeof fieldValue[0] === 'object') {
        fieldValue.forEach((o) => resolveReferences(o, fileToContent));
      }
    } else {
      if (isRef && typeof fieldValue === 'string') {
        fieldValue = fileToContent[fieldValue];
        content[fieldName] = fieldValue;
      }
      if (typeof fieldValue === 'object') {
        resolveReferences(fieldValue, fileToContent);
      }
    }
  }
}

function contentUrl(obj: types.DocumentModelType) {
  const fileName = obj.__metadata.id;
  if (!fileName?.startsWith(pagesBaseDir)) {
    console.warn(
      'Content file',
      fileName,
      'expected to be a page, but is not under',
      pagesBaseDir
    );
    return;
  }

  let url = fileName.slice(pagesBaseDir.length);
  url = url.split('.')[0];
  if (url.endsWith('/index')) {
    url = url.slice(0, -6) || '/';
  }
  return url;
}

export async function resolveContent(
  options: ContentApiOptions
): Promise<types.DocumentModelType[]> {
  console.log(`[content-api] Resolving content at ${options.rootPath}`);

  let objects = contentFilesInPath(contentBaseDir).map((file) => readContent(file));

  allPages(objects).forEach((obj) => {
    obj.__metadata.urlPath = contentUrl(obj);
  });

  const fileToContent: Record<string, types.DocumentModelType> = Object.fromEntries(
    objects.map((e) => [e.__metadata.id, e])
  );
  objects.forEach((e) => resolveReferences(e, fileToContent));

  objects = objects.map((e) => deepClone(e));
  objects.forEach((e) => annotateContentObject(e));

  return objects;
}

export function allPages(allData: types.DocumentModelType[]): types.PageModelType[] {
  return allData.filter((obj) => {
    return PAGE_MODEL_NAMES.includes(obj.__metadata.modelName);
  }) as types.PageModelType[];
}

/*
Add annotation data to a content object and its nested children.
*/
const skipList = ['__metadata'];
const logAnnotations = false;

function annotateContentObject(o: any, prefix = '', depth = 0) {
  if (!isDev || !o || typeof o !== 'object' || !o.type || skipList.includes(prefix)) return;

  const depthPrefix = '--'.repeat(depth);
  if (depth === 0) {
    if (o.__metadata?.id) {
      o[objectIdAttr] = o.__metadata.id;
      if (logAnnotations)
        console.log('[annotateContentObject] added object ID:', depthPrefix, o[objectIdAttr]);
    } else {
      if (logAnnotations) console.warn('[annotateContentObject] NO object ID:', o);
    }
  } else {
    o[fieldPathAttr] = prefix;
    if (logAnnotations)
      console.log('[annotateContentObject] added field path:', depthPrefix, o[fieldPathAttr]);
  }

  Object.entries(o).forEach(([k, v]) => {
    if (v && typeof v === 'object') {
      const fieldPrefix = (prefix ? prefix + '.' : '') + k;
      if (Array.isArray(v)) {
        v.forEach((e, idx) => {
          const elementPrefix = fieldPrefix + '.' + idx;
          annotateContentObject(e, elementPrefix, depth + 1);
        });
      } else {
        annotateContentObject(v, fieldPrefix, depth + 1);
      }
    }
  });
}

function deepClone(o: object) {
  return JSON.parse(JSON.stringify(o));
}
