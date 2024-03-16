import * as types from './content-types';

export type ObjectEntry =
  | types.Button
  | types.Card
  | types.Footer
  | types.Header
  | types.HeroSection
  | types.Image
  | types.Link
  | types.Testimonial;

export type DataEntry = types.Config | types.Person | types.Theme;

export type PageEntry = types.Page | types.Article | types.CaseStudy;

export type DocumentEntry = DataEntry | PageEntry;

export type Entry = DocumentEntry | ObjectEntry;

export { types };
