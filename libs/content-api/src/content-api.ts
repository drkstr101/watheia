import { DocumentEntry, models } from '@watheia/content-model';

import { LocalContentSchema } from './content-api.types';
import { readDirRecursively } from './lib/file-reader';

export const defaultOptions = {
  rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
  models: Object.values(models),
};

export class LocalContentApi {
  public static async create(
    schema: LocalContentSchema = defaultOptions
  ): Promise<LocalContentApi> {
    const objectsById = await readDirRecursively(schema.rootPath);
    // const documents = await Promise.all(filePaths.map(withLocalResolver(schema)));

    // const fileToContent = Object.fromEntries(documents.map((doc) => [doc.__metadata.id, doc]));
    // return new LocalContentApi(documents.map((doc) => resolveReferences(doc, fileToContent)));
    return new LocalContentApi(objectsById);
  }

  constructor(public readonly objectsById: Record<string, DocumentEntry>) {}
}
