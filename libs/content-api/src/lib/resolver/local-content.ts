import { getPageUrl } from '@watheia/content-helpers';
import { Model, ModelName, models } from '@watheia/content-model';
import { globSync as glob } from 'fast-glob';
import frontmatter from 'front-matter';
import { readFileSync } from 'fs';
import { extname, join } from 'path';

// TODO use types?

const rootPath = process.env['LOCAL_CONTENT_DIR'] ?? join(__dirname, '../../../../..');
const pagesDir = 'content/pages';
const dataDir = 'content/data';

const allReferenceFields: Record<string, boolean> = {};
Object.entries(models).forEach(([modelName, model]) => {
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
  return glob(globPattern, { cwd: rootPath });
}

function getModelByName(name: string): Model {
  const model = models[name as ModelName];
  if (!model) throw Error(`Could not locate model named: ${name}`);
  if (model.name !== name) throw Error(`Model name/key mismatch found for: ${name}`);
  return model;
}

function readContent(file: string) {
  const rawContent = readFileSync(join(rootPath, file), 'utf8');
  let content: any = null;
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
    modelType: getModelByName(content.type).type,
  };

  return content;
}

function resolveReferences(content: any, fileToContent: { [x: string]: any }) {
  if (!content || !content.type) return;

  const model = getModelByName(content.type);
  // Make Sourcebit-compatible
  if (!content.__metadata) content.__metadata = { modelType: model.type };

  for (const fieldName in content) {
    let fieldValue = content[fieldName];
    if (!fieldValue) continue;

    const isRef = isRefField(model.name, fieldName);
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

export function resolveContent() {
  const [data, pages] = [dataDir, pagesDir].map((dir) => {
    return contentFilesInPath(dir).map((file) => readContent(file));
  });
  const objects = [...pages, ...data];
  const fileToContent = Object.fromEntries(objects.map((e) => [e.__metadata.id, e]));

  objects.forEach((e) => resolveReferences(e, fileToContent));

  pages.forEach((page) => {
    page.__metadata.urlPath = getPageUrl(page);
  });

  const siteConfig = data.find((e) => e.type === models.Config.name) ?? null;
  return { objects, pages, props: { site: siteConfig } };
}
