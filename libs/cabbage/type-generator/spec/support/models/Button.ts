import { ObjectModel } from '@watheia/content-model';

export const Button: ObjectModel = {
  name: 'Button',
  type: 'object',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'url', type: 'string' },
    { name: 'theme', type: 'enum', options: ['default', 'outline'] },
  ],
};
