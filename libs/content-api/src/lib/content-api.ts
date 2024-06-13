import { types } from '@watheia/content-model';
import type { ContentApiOptions } from './content-api.types';
import { resolveContent } from './resolver';
import { resolveStaticProps } from './static-props-resolvers';

export class LocalContentApi {
  public static async resolve(options: ContentApiOptions): Promise<LocalContentApi> {
    return new LocalContentApi(await resolveContent(options));
  }

  constructor(public readonly documents: types.DocumentModelType[]) {}

  staticPaths(): { paths: string[]; fallback: false } {
    const paths = this.documents.map((obj) => obj.__metadata.urlPath).filter(Boolean) as string[];
    return { paths, fallback: false };
  }

  getProps(urlPath: string) {
    return resolveStaticProps(urlPath, this.documents);
  }
}
