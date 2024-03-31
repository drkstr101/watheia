import { parseFileSync, readDirRecursively } from '../../src/lib/utils';
import { FIXTURES_DIR, fixturePath } from '../support';

describe('watheia.content-api/utils', () => {
  describe('#parseFileSync(filePath)', () => {
    it('parses a valid json file', () => {
      const data = parseFileSync(fixturePath('content/data/people/jane-doe.json'));
      expect(data).toEqual({
        type: 'Person',
        name: 'Jane Doe',
        role: 'Co-Founder / CEO',
        image: { type: 'Image', src: '/images/jane-doe.jpg', altText: 'Jane Doe' },
      });
    });
    it('parses a valid markdown file', () => {
      const data = parseFileSync(fixturePath('content/pages/blog/article-1.md'));
      expect(data).toContainKey('markdown_content');
      expect(data['markdown_content']).toBeString();
      expect(data).toContainEntries([
        ['type', 'Article'],
        ['slug', 'article-1'],
        ['title', 'Ullam qui ipsa sapiente et eaque tempore.'],
        [
          'description',
          'Quibusdam quam omnis voluptatem ipsa omnis magnam dolorem. Nam ut qui nesciunt aliquam et qui numquam.',
        ],
        ['date', '2024-01-01'],
        ['author', 'content/data/people/jane-doe.json'],
      ]);
    });
  });

  describe('readDirRecursively(rootPath, contentDirs, allowedExtensions)', () => {
    it('returns a map of data entries by relative file path for all supported files in a directory', () => {
      const documentsById = readDirRecursively(FIXTURES_DIR);
      expect(documentsById).toBeObject();
    });
  });
});

// 800 562 3022
