import { PageModel } from '@watheia/content-model';

export const Page: PageModel = {
  name: 'Page',
  type: 'page',
  hideContent: true,
  urlPath: '/{slug}',
  filePath: 'content/pages/{slug}.md',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'sections', type: 'list', items: { type: 'model', models: ['Hero', 'Stats'] } },
  ],
};
