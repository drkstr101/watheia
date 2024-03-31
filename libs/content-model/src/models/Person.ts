import { Model } from '@stackbit/types';

export const Person: Model = {
  type: 'data',
  name: 'Person',
  label: 'Person',
  labelField: 'name',
  fields: [
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
      default: 'Full Name',
      hidden: false,
      localized: false,
    },
    {
      type: 'string',
      name: 'role',
      label: 'Role',
      required: false,
      default: 'Role',
      hidden: false,
      localized: false,
    },
    {
      type: 'markdown',
      name: 'bio',
      label: 'Bio',
      required: false,
      default:
        'With over 10 years in both public and private sectors, Johnna has experience in management consultation, team building, professional development, strategic implementation, and company collaboration.',
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
      models: ['ImageBlock'],
    },
    {
      type: 'enum',
      name: 'colors',
      label: 'Colors',
      required: false,
      default: 'bg-light-fg-dark',
      hidden: false,
      localized: false,
      options: [
        {
          label: 'Light background, dark foreground',
          value: 'bg-light-fg-dark',
          textColor: '$dark',
          backgroundColor: '$light',
          borderColor: '#ececec',
        },
        {
          label: 'Neutral background, dark foreground',
          value: 'bg-neutral-fg-dark',
          textColor: '$dark',
          backgroundColor: '$colors.neutral.200',
          borderColor: '#ececec',
        },
        {
          label: 'Neutral alt background, dark foreground',
          value: 'bg-neutralAlt-fg-dark',
          textColor: '$dark',
          backgroundColor: '$colors.neutral.300',
          borderColor: '#ececec',
        },
        {
          label: 'Dark background, light foreground',
          value: 'bg-dark-fg-light',
          textColor: '$light',
          backgroundColor: '$dark',
          borderColor: '#ececec',
        },
      ],
      group: 'cardStyles',
      controlType: 'palette',
    },
    {
      type: 'string',
      name: 'elementId',
      label: 'Element ID',
      description: 'The unique ID for an HTML element, must not contain whitespace',
      required: false,
      hidden: false,
      localized: false,
      group: 'settings',
    },
    {
      type: 'style',
      name: 'styles',
      label: 'Styles',
      required: false,
      hidden: false,
      localized: false,
      styles: {
        self: {
          margin: ['tw0:96'],
          padding: ['tw0:96'],
          justifyContent: ['flex-start', 'flex-end', 'center'],
          borderWidth: ['0:2', '4:8:4'],
          borderStyle: '*',
          borderColor: [
            {
              value: 'border-dark',
              label: 'Dark',
              color: '$dark',
            },
            {
              value: 'border-light',
              label: 'Light',
              color: '$light',
            },
            {
              value: 'border-neutral',
              label: 'Neutral',
              color: '$colors.neutral.200',
            },
            {
              value: 'border-neutralAlt',
              label: 'Neutral alt',
              color: '$colors.neutral.300',
            },
            {
              value: 'border-primary',
              label: 'Primary',
              color: '$colors.primary.500',
            },
          ],
          borderRadius: '*',
          textAlign: '*',
        },
      },
    },
  ],
  fieldGroups: [
    {
      name: 'cardStyles',
      label: 'Card styles',
      icon: 'palette',
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'gear',
    },
  ],
};
