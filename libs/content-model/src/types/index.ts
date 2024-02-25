import * as types from './content-types';

export type ObjectModelProps =
  | types.Button
  | types.Card
  | types.Footer
  | types.Header
  | types.HeroSection
  | types.Image
  | types.Link
  | types.Testimonial;

export type DataModelProps = types.Config | types.Person | types.Theme;

export type PageModelProps = types.Page | types.Article | types.CaseStudy;

export type DocumentModelProps = DataModelProps | PageModelProps;

export type ModelProps = DocumentModelProps | ObjectModelProps;

export { types };
