import { PageModel } from '@stackbit/types';

export const Article: PageModel = {
  type: 'page',
  name: 'Article',
  label: 'Article',
  urlPath: '/blog/{slug}',
  filePath: 'content/pages/blog/{slug}.md',
  hideContent: true,
  thumbnail: 'https://assets.stackbit.com/components/models/thumbnails/default.png',
  fields: [
    {
      type: 'string',
      name: 'slug',
      label: 'Slug',
      description: 'A unique url for this page starting with "/"',
      required: true,
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      default: 'This Is a New Page',
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      default: 'A brief (1-3 sentence) summary of the content',
      required: true,
    },
    {
      type: 'date',
      name: 'date',
      label: 'The listed publication date',
      required: true,
    },
    {
      type: 'reference',
      name: 'author',
      label: 'Author',
      models: ['Person'],
    },
  ],
};
