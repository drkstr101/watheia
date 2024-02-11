import { DataModel } from '@stackbit/types';

export const Theme: DataModel = {
  type: 'data',
  name: 'Theme',
  label: 'Theme Style',
  singleInstance: true,
  filePath: 'content/data/theme.json',
  readOnly: true,
  fields: [
    {
      type: 'enum',
      name: 'mode',
      label: 'Mode',
      controlType: 'button-group',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      default: 'light',
    },
    { type: 'color', name: 'primaryColor', label: 'Primary color' },
    {
      type: 'color',
      name: 'secondaryColor',
      label: 'Secondary color',
    },
  ],
};
