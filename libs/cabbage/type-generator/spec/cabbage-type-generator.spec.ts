import { generateModelTypes } from '../src/lib/cabbage-type-generator';
import model from './support/models';

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
      const output = generateModelTypes(Object.values(model));
      expect(output).toEqualIgnoringWhitespace(`
        export interface Button {
            __metadata: {
                modelType: 'object';
            };
            type: 'Button';
            label?: string;
            url?: string;
            theme?:  'default' | 'outline';
        }
        export interface Hero {
            __metadata: {
                modelType: 'object';
            };
            type: 'Hero';
            heading?: string;
            body?: string;
            image?: {
              src?: string;
              alt?: string;
            };
            button?: Button;
            theme?:  'imgLeft' | 'imgRight';
        }
        export interface Page {
            __metadata: {
                modelType: 'page';
                id: string;
                urlPath: string;
            };
            type: 'Page';
            title: string;
            sections?: (Hero | Stats)[];
        }
        export interface Stats {
            __metadata: {
                modelType: 'object';
            };
            type: 'Stats';
            heading?: string;
            body?: string;
            stats?: { label?: string; value?: string; }[];
            theme?: 'primary' | 'dark';
        }
      `);
    });
  });
});
