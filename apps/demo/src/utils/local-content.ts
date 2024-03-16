import { globSync as glob } from 'fast-glob';
import frontmatter from 'front-matter';
import * as fs from 'fs';
import { extname, join } from 'path';
import { allModels } from '../../sources/local/models';
import { Config } from '../../sources/local/models/Config';
import sbConfig from '../../stackbit.config';
import { getPageUrl } from './page-utils';

// TODO use types?

const appDir = process.env['LOCAL_CONTENT_DIR'] ?? join(__dirname, '../..');
const pagesDir = sbConfig.pagesDir || 'content/pages';
const dataDir = sbConfig.dataDir || 'content/data';

const allReferenceFields: Record<string, boolean> = {};
Object.entries(allModels).forEach(([modelName, model]) => {
  model.fields?.forEach((field) => {
    if (
      field.type === 'reference' ||
      (field.type === 'list' && field.items?.type === 'reference')
    ) {
      allReferenceFields[modelName + ':' + field.name] = true;
    }
  });
});

function isRefField(modelName: string, fieldName: string) {
  return !!allReferenceFields[modelName + ':' + fieldName];
}

const supportedFileTypes = ['md', 'json'];

function contentFilesInPath(dir: string) {
  const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
  return glob(globPattern, { cwd: appDir });
}

function readContent(file: string) {
  const rawContent = fs.readFileSync(join(appDir, file), 'utf8');
  let content = null;
  switch (extname(file).substring(1)) {
    case 'md':
      // eslint-disable-next-line no-case-declarations
      const parsedMd = frontmatter<Record<string, any>>(rawContent);
      content = {
        ...parsedMd.attributes,
        content: parsedMd.body,
      };
      break;
    case 'json':
      content = JSON.parse(rawContent);
      break;
    default:
      throw Error(`Unhandled file type: ${file}`);
  }

  // Make Sourcebit-compatible
  content.__metadata = {
    id: file,
    modelName: content.type,
  };

  return content;
}

function resolveReferences(
  content: { [x: string]: any; type: any; __metadata: { modelName: any } },
  fileToContent: { [x: string]: any }
) {
  if (!content || !content.type) return;

  const modelName = content.type;
  // Make Sourcebit-compatible
  if (!content.__metadata) content.__metadata = { modelName: content.type };

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
        fieldValue.forEach((o: any) => resolveReferences(o, fileToContent));
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

export function allContent() {
  const [data, pages] = [dataDir, pagesDir].map((dir) => {
    return contentFilesInPath(dir).map((file) => readContent(file));
  });
  const objects = [...pages, ...data];
  const fileToContent = Object.fromEntries(objects.map((e) => [e.__metadata.id, e]));

  objects.forEach((e) => resolveReferences(e, fileToContent));

  pages.forEach((page) => {
    page.__metadata.urlPath = getPageUrl(page);
  });

  const siteConfig = data.find((e) => e.__metadata.modelName === Config.name) ?? null;
  return { objects, pages, props: { site: siteConfig } };
}
