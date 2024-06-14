export const objectIdAttr = 'data-sb-object-id';
export const fieldPathAttr = 'data-sb-field-path';

export type HasAnnotation =
  | {
      'data-sb-object-id'?: string;
    }
  | {
      'data-sb-field-path'?: string;
    };

export type ContentObjectMetadata = {
  id?: string;
  modelName: string;
  urlPath?: string;
};

export type BaseContentObject = {
  __metadata: ContentObjectMetadata;
} & HasAnnotation;
