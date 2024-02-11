import { ObjectModel } from '@stackbit/types';

export const Button: ObjectModel = {
  type: 'object',
  name: 'Button',
  label: 'Button',
  labelField: 'label',
  fieldGroups: [{ name: 'styles', label: 'Styles' }],
  fields: [
    { type: 'string', name: 'label', label: 'Label', default: 'Learn more', required: true },
    { type: 'string', name: 'href', label: 'URL', default: '/', required: true },
    {
      type: 'enum',
      name: 'size',
      group: 'styles',
      controlType: 'button-group',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      default: 'medium',
    },
    {
      type: 'enum',
      name: 'variant',
      group: 'styles',
      controlType: 'button-group',
      label: 'Variant',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
        { label: 'Clear', value: 'clear' },
      ],
      default: 'text',
    },
    {
      type: 'enum',
      name: 'color',
      group: 'styles',
      controlType: 'button-group',
      label: 'Color',
      options: [
        { label: 'Inherit', value: 'default' },
        { label: 'Neutral', value: 'neutral' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
      ],
      default: 'primary',
    },
  ],
};
