import { DocumentEntry, Model, PageEntry, types } from '@watheia/content-model';

export interface ContentApi {
  resolve: () => ContentApi;
}

export interface LocalContentSchema {
  rootPath: string;
  contentDirs: string[];
  models: Model[];
}

export type DebugContext = {
  keyPath: (string | number)[];
  stack: Record<string, any>[];
};

export interface ContentCache {
  objects: DocumentEntry[];
  pages: PageEntry[];
  props: { site: types.Config };
  schema: LocalContentSchema;
}
