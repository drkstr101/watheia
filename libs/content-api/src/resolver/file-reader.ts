import frontmatter from 'front-matter';
import { readFileSync } from 'fs';
import { extname, join } from 'path';
import { LocalContentSchema } from '../content-api.types';

function parseMarkdown(file: string, rawContent: string) {
  const { attributes, body } = frontmatter<Record<string, unknown>>(rawContent);
  return {
    ...attributes,
    content: body,
    __metadata: { id: file },
  };
}
function parseJson(file: string, rawContent: string) {
  return {
    ...JSON.parse(rawContent),
    __metadata: { id: file },
  };
}

export function withLocalContent(schema: LocalContentSchema) {
  // console.log(`withLocalContent(${schema})`);
  return (file: string) => {
    // console.log(`Resolving:`, file);
    const absolutePath = join(schema.rootPath, file);
    const rawContent = readFileSync(absolutePath, 'utf8');
    const ext = extname(file).substring(1);

    // console.log('absolutePath = ', absolutePath);

    switch (ext) {
      case 'md':
        return parseMarkdown(file, rawContent);
      case 'json':
        return parseJson(file, rawContent);
      default:
        throw Error(`Unhandled file type: ${file}`);
    }
  };
}
