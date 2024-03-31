import { Model } from '@stackbit/types';

export const TitleBlock: Model = {
  type: 'object',
  name: 'TitleBlock',
  label: 'Title',
  labelField: 'text',
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      description: 'The alt text of the image',
      required: false,
      default: 'This Is A Big Headline',
      hidden: false,
      localized: false,
    },
    {
      type: 'enum',
      name: 'color',
      label: 'Color',
      required: false,
      default: 'black',
      hidden: false,
      localized: false,
      options: [
        {
          label: 'Dark',
          value: 'black',
          textColor: '$colors.black',
          backgroundColor: '$colors.black',
          borderColor: '#ececec',
        },
        {
          label: 'Light',
          value: 'white',
          textColor: '$colors.white',
          backgroundColor: '$colors.white',
          borderColor: '#ececec',
        },
        {
          label: 'Neutral',
          value: 'neutral',
          textColor: '$colors.neutral.200',
          backgroundColor: '$colors.neutral.200',
          borderColor: '#ececec',
        },
        {
          label: 'Primary',
          value: 'primary',
          textColor: '$colors.primary.500',
          backgroundColor: '$colors.primary.500',
          borderColor: '#ececec',
        },
      ],
      group: 'styles',
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
          fontStyle: '*',
          fontWeight: ['400', '500', '700'],
          textDecoration: '*',
          textAlign: '*',
        },
      },
    },
  ],
  fieldGroups: [
    {
      name: 'styles',
      label: 'Styles',
      icon: 'palette',
    },
  ],
};
