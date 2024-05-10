import generateModelTypes from '../src/generator';
import { models } from '../src/models';

describe('watheia.cabbage/type-generator', () => {
  // afterEach(() => rmSync(tempFile));
  describe('generateModelTypes', () => {
    it('generates an empty file when no models provided', () => {
      const output = generateModelTypes([]);
      expect(output).toBeEmpty();
    });

    it('transforms simple model types', () => {
      const output = generateModelTypes([
        {
          name: 'Page',
          type: 'page',
          fields: [
            { name: 'slug', type: 'string', required: true },
            { name: 'content', type: 'markdown' },
          ],
        },
      ]);
      expect(output).toEqualIgnoringWhitespace(`
        export interface Page {
          __metadata: { modelType: 'page'; id: string; urlPath: string; };
          type: 'Page';
          slug: string;
          content?: string;
        }
      `);
    });

    it('transforms complex model types', () => {
      expect(generateModelTypes(Object.values(models))).toMatchSnapshot();
    });
  });
});
