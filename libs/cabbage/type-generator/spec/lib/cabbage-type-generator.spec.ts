import { Model } from '@watheia/content-model';

import { generateModelTypes } from '../../src/lib/cabbage-type-generator';

// const tempFile = join(tmpdir(), `type-generator-${new Date().getTime()}`);

export const models: Model[] = [
  {
    name: 'Page',
    type: 'page',
    fields: [
      { name: 'slug', type: 'string', required: true },
      { name: 'content', type: 'markdown' },
    ],
  },
];

describe('watheia.cabbage/type-generator', () => {
  // afterEach(() => rmSync(tempFile));
  describe('generateModelTypes', () => {
    it('generates an empty file when no models provided', () => {
      const output = generateModelTypes([]);
      expect(output).toBeEmpty();
    });

    it('generates simple model types', () => {
      const output = generateModelTypes(models);
      expect(output).toEqualIgnoringWhitespace(`export interface Page {
        __metadata: { modelType: 'page'; };
        type: 'Page';
        slug: string;
        content?: string;
      }
      `);
    });
  });
});
