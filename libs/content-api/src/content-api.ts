import type { ContentCache, LocalContentSchema } from './lib/content-api.types';
import { resolveContent, resolveStaticPaths, resolveStaticProps } from './lib/resolver';

// export const defaultOptions = {
//   rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
//   contentDirs: ['content/data', 'content/pages'],
//   models: Object.values(models),
// };

export class LocalContentApi {
  public static async create(schema: LocalContentSchema): Promise<LocalContentApi> {
    const cache = await resolveContent();
    return new LocalContentApi(schema, cache);
  }

  constructor(public readonly schema: LocalContentSchema, public readonly cache: ContentCache) {}

  resolvePaths(): string[] {
    return resolveStaticPaths(this.cache);
  }

  resolveProps(urlPath: string) {
    return resolveStaticProps(urlPath, this.cache);
  }
}
