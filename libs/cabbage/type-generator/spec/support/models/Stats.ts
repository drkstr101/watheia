import { ObjectModel } from '@watheia/content-model';

export const Stats: ObjectModel = {
  name: 'Stats',
  type: 'object',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'body', type: 'markdown' },
    {
      name: 'stats',
      type: 'list',
      items: {
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'value', type: 'string' },
        ],
      },
    },
    { name: 'theme', type: 'enum', options: ['primary', 'dark'] },
  ],
};
