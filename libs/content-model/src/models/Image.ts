import { ObjectModel } from '@stackbit/types';

export const Image: ObjectModel = {
  type: 'object',
  name: 'Image',
  label: 'Image',
  labelField: 'altText',
  fields: [
    {
      type: 'image',
      name: 'src',
      label: 'Image',
      required: true,
      description: 'The URL of the image',
      default: 'https://assets.stackbit.com/components/images/default/default-image.png',
    },
    {
      type: 'string',
      name: 'altText',
      label: 'Alt text',
      required: true,
      description: 'The alt text of the image',
      default: 'Image alt text',
    },
  ],
};
