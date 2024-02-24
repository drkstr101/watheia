import { DataModel } from '@stackbit/types';

export const Person: DataModel = {
  type: 'data',
  name: 'Person',
  label: 'Person',
  labelField: 'fullName',
  filePath: 'people/{name}.json',
  fields: [
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
      hidden: false,
      localized: false,
    },
    {
      type: 'string',
      name: 'fullName',
      label: 'Full name',
      required: true,
      default: 'Full Name',
      hidden: false,
      localized: false,
    },
    {
      type: 'string',
      name: 'role',
      label: 'Role',
      required: true,
      default: 'User',
      hidden: false,
      localized: false,
    },
    {
      type: 'model',
      name: 'image',
      label: 'Image',
      required: false,
      hidden: false,
      localized: false,
      models: ['Image'],
    },
  ],
  fieldGroups: [],
};
