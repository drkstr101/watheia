import { models } from './models';

export type { ConfigModel, DataModel, Model, ObjectModel, PageModel } from '@stackbit/types';

export type ContentModel = typeof models;

export type ModelName = keyof ContentModel;

export const ALL_MODEL_NAMES = Object.keys(models) as ModelName[];

export { models };

export * as types from './types';
