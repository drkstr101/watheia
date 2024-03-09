import { models } from '@watheia/content-model';

import { LocalContentSchema } from './content-api.types';
import { withLocalResolver } from './resolver/file-reader';
import { scanContentDir } from './util/file-utils';

export const defaultOptions = {
  rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
  models: Object.values(models),
};

export class LocalContentApi {
  public static async create(
    schema: LocalContentSchema = defaultOptions
  ): Promise<LocalContentApi> {
    const filePaths = await scanContentDir(schema.rootPath);
    const documents = await Promise.all(filePaths.map(withLocalResolver(schema)));

    // const fileToContent = Object.fromEntries(documents.map((doc) => [doc.__metadata.id, doc]));
    // return new LocalContentApi(documents.map((doc) => resolveReferences(doc, fileToContent)));
    return new LocalContentApi(documents);
  }

  constructor(public readonly documents: unknown[]) {}
}
