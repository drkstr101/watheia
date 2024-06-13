import { models } from '@watheia/content-model';
import { join } from 'path';

import { LocalContentApi } from '../src/lib/content-api';

const mockOptions = {
  models: Object.values(models),
  contentDirs: ['content/data', 'content/pages'],
  rootPath: join(__dirname, '__fixtures__'),
};

describe('watheia.content-api', () => {
  describe('#resolve()', () => {
    it('fully resolves local content cache with the provided schema', async () => {
      const api = await LocalContentApi.resolve(mockOptions);
      expect(api).toBeInstanceOf(LocalContentApi);
      expect(api.documents).toMatchSnapshot();
    });
  });
});
