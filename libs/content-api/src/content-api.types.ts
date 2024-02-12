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
