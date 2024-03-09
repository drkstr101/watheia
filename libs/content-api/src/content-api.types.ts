import { Model } from '@watheia/content-model';

export interface ContentApi {
  resolve: () => ContentApi;
}

export interface LocalContentSchema {
  rootPath: string;
  models: Model[];
}

export interface MetaTag {
  property: string;
  content: string;
  format: 'property' | 'name';
}

type Context = {
  /** The document/asset file path relative to project directory. */
  filePath: string;
};

export type DocumentContext = Context;
export type AssetContext = Context;
