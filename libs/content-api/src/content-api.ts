import type { ContentCache, LocalContentSchema } from './lib/content-api.types';
import { resolveContent, resolveStaticPaths, resolveStaticProps } from './lib/resolver';

export class LocalContentApi {
  public static async create(schema: LocalContentSchema): Promise<LocalContentApi> {
    return new LocalContentApi(await resolveContent(schema));
  }

  constructor(public readonly cache: ContentCache) {}

  resolvePaths(): string[] {
    return resolveStaticPaths(this.cache);
  }

  resolveProps(urlPath: string) {
    return resolveStaticProps(urlPath, this.cache);
  }
}
