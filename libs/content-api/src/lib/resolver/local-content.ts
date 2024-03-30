import { getPageUrl } from '@watheia/content-helpers';
import type { Model } from '@watheia/content-model';
import { globSync as glob } from 'fast-glob';
import frontmatter from 'front-matter';
import { readFileSync } from 'fs';
import { extname, join } from 'path';
import { ContentCache, LocalContentSchema } from '../content-api.types';

// TODO use types?

// const rootPath = process.env['LOCAL_CONTENT_DIR'] ?? join(__dirname, '../../../../..');
// const pagesDir = 'content/pages';
// const dataDir = 'content/data';

const supportedFileTypes = ['md', 'json'];

export function resolveContent(schema: LocalContentSchema): ContentCache {
  const allReferenceFields: Record<string, boolean> = {};

  function isRefField(modelName: string, fieldName: string) {
    return !!allReferenceFields[modelName + ':' + fieldName];
  }

  function contentFilesInPath(dir: string) {
    const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
    return glob(globPattern, { cwd: schema.rootPath });
  }

  function getModelByName(name: string): Model {
    const model = schema.models.find((m) => m.name === name);
    if (!model) throw Error(`Could not locate model named: ${name}`);
    if (model.name !== name) throw Error(`Model name/key mismatch found for: ${name}`);
    return model;
  }

  function readContent(file: string) {
    const rawContent = readFileSync(join(schema.rootPath, file), 'utf8');
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

  Object.entries(schema.models).forEach(([modelName, model]) => {
    model.fields?.forEach((field) => {
      if (
        field.type === 'reference' ||
        (field.type === 'list' && field.items?.type === 'reference')
      ) {
        allReferenceFields[modelName + ':' + field.name] = true;
      }
    });
  });

  const [data, pages] = schema.contentDirs.map((dir) => {
    return contentFilesInPath(dir).map((file) => readContent(file));
  });
  const objects = [...pages, ...data];
  const fileToContent = Object.fromEntries(objects.map((e) => [e.__metadata.id, e]));

  objects.forEach((e) => resolveReferences(e, fileToContent));

  pages.forEach((page) => {
    page.__metadata.urlPath = getPageUrl(page);
  });

  const site = data.find((e) => e.type === 'Config') ?? null;
  return { objects, pages, props: { site }, schema };
}
