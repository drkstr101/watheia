import { ObjectModel } from '@watheia/content-model';

export const Hero: ObjectModel = {
  name: 'Hero',
  type: 'object',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'body', type: 'markdown' },
    {
      name: 'image',
      type: 'object',
      fields: [
        { name: 'src', type: 'image' },
        { name: 'alt', type: 'string' },
      ],
    },
    { name: 'button', type: 'model', models: ['Button'] },
    { name: 'theme', type: 'enum', options: ['imgLeft', 'imgRight'] },
  ],
};
