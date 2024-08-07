import { Model } from '@stackbit/types';

export const QuoteSectionModel: Model = {
  type: 'object',
  name: 'QuoteSection',
  label: 'Quote',
  labelField: 'name',
  thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
  groups: ['SectionModels'],
  fieldGroups: [
    {
      name: 'styles',
      label: 'Styles',
      icon: 'palette',
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: 'gear',
    },
  ],
  fields: [
    {
      type: 'markdown',
      name: 'quote',
      label: 'Quote',
      default:
        "“We think coding should be required in every school because it's as important as any kind of second language.”",
      required: true,
    },
    {
      type: 'string',
      name: 'name',
      label: 'Author name',
      default: 'Johnna Doe',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Author title',
      default: 'Product Marketing Manager at Acme',
    },
    {
      type: 'enum',
      name: 'colors',
      label: 'Colors',
      description: 'The color theme of the section',
      group: 'styles',
      controlType: 'palette',
      options: [
        {
          label: 'Colors A',
          value: 'colors-a',
          textColor: '$onDark',
          backgroundColor: '$black',
          borderColor: '#ececec',
        },
        {
          label: 'Colors B',
          value: 'colors-b',
          textColor: '$onLight',
          backgroundColor: '$white',
          borderColor: '#ececec',
        },
        {
          label: 'Colors C',
          value: 'colors-c',
          textColor: '$onPrimary',
          backgroundColor: '$primary',
          borderColor: '#ececec',
        },
        {
          label: 'Colors D',
          value: 'colors-d',
          textColor: '$onSecondary',
          backgroundColor: '$secondary',
          borderColor: '#ececec',
        },
        {
          label: 'Colors E',
          value: 'colors-e',
          textColor: '$onComplementary',
          backgroundColor: '$neutral',
          borderColor: '#ececec',
        },
        {
          label: 'Colors F',
          value: 'colors-f',
          textColor: '$onLight',
          backgroundColor: 'transparent',
          borderColor: '#ececec',
        },
      ],
      default: 'colors-f',
    },
    {
      type: 'string',
      name: 'elementId',
      group: 'settings',
      label: 'Element ID',
      description: 'The unique ID for an HTML element, must not contain whitespace',
      default: '',
    },
    {
      type: 'style',
      name: 'styles',
      styles: {
        self: {
          height: ['auto', 'screen'],
          width: ['narrow', 'wide', 'full'],
          margin: ['tw0:96'],
          padding: ['tw0:96'],
          justifyContent: ['flex-start', 'flex-end', 'center'],
          borderRadius: '*',
          borderWidth: ['0:8'],
          borderStyle: '*',
          borderColor: [
            {
              value: 'border-primary-500',
              label: 'Primary color',
              color: '$primary',
            },
            {
              value: 'border-secondary-500',
              label: 'Secondary color',
              color: '$secondary',
            },
            {
              value: 'border-black',
              label: 'Dark color',
              color: '$black',
            },
            {
              value: 'border-neutral-500',
              label: 'Complementary color',
              color: '$neutral',
            },
          ],
        },
        quote: {
          textAlign: ['left', 'center', 'right'],
        },
        name: {
          fontWeight: ['400', '500'],
          fontStyle: ['italic'],
          textAlign: ['left', 'center', 'right'],
          textDecoration: ['underline'],
        },
        title: {
          fontWeight: ['400', '500'],
          fontStyle: ['italic'],
          textAlign: ['left', 'center', 'right'],
          textDecoration: ['underline'],
        },
      },
      default: {
        self: {
          height: 'auto',
          width: 'wide',
          margin: ['mt-0', 'mb-0', 'ml-0', 'mr-0'],
          padding: ['pt-12', 'pb-12', 'pl-4', 'pr-4'],
          justifyContent: 'center',
          borderRadius: 'none',
          borderWidth: 0,
          borderStyle: 'none',
          borderColor: 'border-black',
        },
        quote: {
          textAlign: 'center',
        },
        name: {
          fontWeight: 400,
          textAlign: 'center',
        },
        title: {
          fontWeight: 400,
          textAlign: 'center',
        },
      },
    },
  ],
};
