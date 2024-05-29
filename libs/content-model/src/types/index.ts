import { Config, ContentObject } from './generated';

export * from './base';
export * as types from './generated';

export type GlobalProps = {
  site: Config;
};

export type PageComponentProps = ContentObject & {
  global: GlobalProps;
};
