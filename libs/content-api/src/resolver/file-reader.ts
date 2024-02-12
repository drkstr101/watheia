import { Model, ModelName } from '@watheia/content-model';
import frontmatter from 'front-matter';
import { readFileSync } from 'fs';
import { extname, join } from 'path';
import { LocalContentSchema } from '../content-api.types';

function addMetadata(data: Record<string, unknown>, relPath: string, model: Model) {
  return {
    ...data,
    __metadata: { type: model.type, id: relPath },
  };
}

export function withLocalResolver(schema: LocalContentSchema) {
  // console.log(`withLocalContent(${schema})`);
  return async (relPath: string) => {
    // console.log(`Resolving:`, file);
    const absolutePath = join(schema.rootPath, relPath);
    const rawContent = readFileSync(absolutePath, 'utf8');
    const ext = extname(relPath).substring(1);

    // console.log('absolutePath = ', absolutePath);

    let content;
    switch (ext) {
      case 'md':
        // eslint-disable-next-line no-case-declarations
        const { attributes, body } = frontmatter<Record<string, unknown>>(rawContent);
        content = { ...attributes, content: body };
        break;
      case 'json':
        content = JSON.parse(rawContent);
        break;
      default:
        throw Error(`Unhandled file extension: ${relPath}`);
    }

    const modelName = content['type'] as ModelName;
    const model = schema.models.find((m) => m.name === modelName);
    if (!model) {
      throw new Error(`Unhandled model type (${modelName}) found in ${relPath}`);
    }

    return addMetadata(content, relPath, model);
  };
}
