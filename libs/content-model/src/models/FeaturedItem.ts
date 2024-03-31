import { ObjectModel } from '@stackbit/types';

export const FeaturedItem: ObjectModel = {
  type: 'object',
  name: 'FeaturedItem',
  label: 'Item',
  labelField: 'title',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
      default: 'This Is The Item Title',
      hidden: false,
      localized: false,
    },
    {
      type: 'string',
      name: 'tagline',
      label: 'Tagline',
      description:
        'A small short text above the title. Also used as a tab title in the tab navigation arrangement of carousel section.',
      required: false,
      default: 'This is the tagline',
      hidden: false,
      localized: false,
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtitle',
      required: false,
      default: 'This is the item subtitle',
      hidden: false,
      localized: false,
    },
    {
      type: 'markdown',
      name: 'text',
      label: 'Text',
      required: false,
      default:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.',
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
      type: 'list',
      name: 'actions',
      label: 'Actions',
      required: false,
      hidden: false,
      localized: false,
      items: {
        type: 'model',
        models: ['Button', 'Link'],
      },
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
          textColor: '$colors.black',
          backgroundColor: '$colors.white',
          borderColor: '#ececec',
        },
        {
          label: 'Neutral background, dark foreground',
          value: 'bg-neutral-fg-dark',
          textColor: '$colors.black',
          backgroundColor: '$colors.neutral.200',
          borderColor: '#ececec',
        },
        {
          label: 'Neutral alt background, dark foreground',
          value: 'bg-neutralAlt-fg-dark',
          textColor: '$colors.black',
          backgroundColor: '$colors.neutral.300',
          borderColor: '#ececec',
        },
        {
          label: 'Dark background, light foreground',
          value: 'bg-dark-fg-light',
          textColor: '$colors.white',
          backgroundColor: '$colors.black',
          borderColor: '#ececec',
        },
      ],
      group: 'cardStyles',
      controlType: 'palette',
    },
    {
      type: 'style',
      name: 'styles',
      label: 'Styles',
      description: 'The styles field is controlled by Stackbit editor',
      required: false,
      hidden: false,
      localized: false,
      styles: {
        self: {
          margin: ['tw0:96'],
          padding: ['tw0:96'],
          flexDirection: '*',
          justifyContent: ['flex-start', 'flex-end', 'center'],
          borderWidth: ['0:2', '4:8:4'],
          borderStyle: '*',
          borderColor: [
            {
              value: 'border-dark',
              label: 'Dark',
              color: '$colors.black',
            },
            {
              value: 'border-light',
              label: 'Light',
              color: '$colors.white',
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
