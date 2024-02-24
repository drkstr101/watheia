import { ObjectModel } from '@stackbit/types';

export const Testimonial: ObjectModel = {
  type: 'object',
  name: 'Testimonial',
  label: 'Testimonial',
  fields: [
    {
      type: 'object',
      name: 'author',
      label: 'Author',
      fields: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'role',
        },
      ],
      default: { name: 'Jane Doe', role: 'CEO of Acme, Inc.' },
    },
    {
      type: 'markdown',
      name: 'content',
      label: 'Text content',
      default:
        'Occaecati ea totam aliquid illum. Iusto qui sed sed dolores corporis blanditiis. Velit vitae et hic praesentium temporibus molestiae odio.',
    },
  ],
};
