import * as types from './content-types';

export type DataEntry =
  | types.Config
  | types.Footer
  | types.Header
  | types.Person
  | types.ThemeStyle;

export type PageEntry = types.Article | types.Page | types.PostFeedLayout;

export type DocumentEntry = DataEntry | PageEntry;

export { types };
