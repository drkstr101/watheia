import { models } from '@watheia/content-model';
import { join } from 'path';

import { LocalContentApi } from '../src/content-api';

const mockOptions = {
  models: Object.values(models),
  contentDirs: ['content/data', 'content/pages'],
  rootPath: join(__dirname, '../../..'),
};

describe('watheia.content-api', () => {
  describe('#resolve()', () => {
    it('fully resolves local content cache with the provided schema', async () => {
      const api = await LocalContentApi.create(mockOptions);
      expect(api).toBeInstanceOf(LocalContentApi);
      const { schema, cache } = api;
      expect({ schema, cache }).toMatchSnapshot();
    });
  });
});
