import { models, type Document } from '@watheia/content-model';

import { DocumentContext } from './lib/content-converter';
import { LocalContentResolver, type ContentResolverOptions } from './lib/local-content-resolver';
import logger from './lib/logger';

export const defaultOptions: ContentResolverOptions = {
  rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
  models: Object.values(models),
  logger,
  localDev: process.env['NODE_ENV'] !== 'production',
  contentDirs: ['content/data', 'content/pages'],
};

export class ContentApi {
  public static create(options: Partial<ContentResolverOptions> = {}): ContentApi {
    return new ContentApi({ ...defaultOptions, ...options });
  }

  private readonly resolver: LocalContentResolver;

  constructor(public readonly options: ContentResolverOptions) {
    this.resolver = new LocalContentResolver(options);
  }

  async getDocuments(): Promise<Document<DocumentContext>[]> {
    return this.resolver.getDocuments();
  }
}
