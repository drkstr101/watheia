import model from '@watheia/content-model';
import { globSync } from 'fast-glob';
import { LocalContentSchema } from './content-api.types';
import { withLocalContent } from './resolver/file-reader';

export const SUPPORTED_EXTENSIONS = ['json', 'yml', 'yaml', 'md'];

export const GLOB_STR = `**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`;

export const defaultOptions = {
  rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
  models: Object.values(model),
  include: [
    `content/data/${GLOB_STR}`,
    `content/pages/${GLOB_STR}`,
    'content/pages/**/index.mdx',
  ],
};

export class LocalContentApi {
  public static async resolve(
    schema: LocalContentSchema = defaultOptions
  ): Promise<LocalContentApi> {
    const options = { cwd: schema.rootPath };
    const resolver = withLocalContent(schema);
    const documents = globSync(schema.include, options).map(resolver);

    // const fileToContent = Object.fromEntries(documents.map((doc) => [doc.__metadata.id, doc]));
    // return new LocalContentApi(documents.map((doc) => resolveReferences(doc, fileToContent)));
    return new LocalContentApi(documents);
  }

  constructor(public readonly documents: unknown[]) {}
}
