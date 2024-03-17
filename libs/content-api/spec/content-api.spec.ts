import { models } from '@watheia/content-model';
import { join } from 'path';

import { ContentApi } from '../src/content-api';
import { ContentResolverOptions } from '../src/lib/local-content-resolver';
import { createMockedLogger } from './support';

const mockOptions: ContentResolverOptions = {
  models: Object.values(models),
  rootPath: join(__dirname, '__fixtures__/basic'),
  logger: createMockedLogger(),
  localDev: true,
  contentDirs: ['pages'],
};

describe('watheia.content-api', () => {
  describe('#create(options)', () => {
    it('returns a fully constructed content api with default options', () => {
      const api = ContentApi.create(mockOptions);
      expect(api).toBeInstanceOf(ContentApi);
      expect(api.options).toBeObject();
    });
    it('returns a fully constructed content api with partial options', () => {
      const api = ContentApi.create({
        localDev: true,
        contentDirs: ['data', 'pages'],
      });
      expect(api.options).toBeObject();
      expect(api.options.localDev).toEqual(true);
      expect(api.options.contentDirs).toEqual(['data', 'pages']);
    });
  });

  describe('getDocuments', () => {
    it('fully resolves all local content', async () => {
      const api = ContentApi.create(mockOptions);
      const documents = await api.getDocuments();
      expect(documents).toBeArray();
      expect(documents).toHaveLength(1);
      expect(documents).toMatchSnapshot();
    });
  });
});
