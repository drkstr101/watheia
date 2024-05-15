import { Config, ContentObject } from './generated';

export * from './base';
export * as types from './generated';

export const DATA_MODEL_NAMES = ['Config', 'Person', 'ThemeStyle'];
export const PAGE_MODEL_NAMES = [
  'PageLayout',
  'PostFeedLayout',
  'PostLayout',
  'ProjectFeedLayout',
  'ProjectLayout',
];

export type GlobalProps = {
  site: Config;
};

export type PageComponentProps = ContentObject & {
  global: GlobalProps;
};
