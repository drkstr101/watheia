import { models } from '@watheia/content-model';
import { join } from 'path';

import { LocalContentApi } from '../src/content-api';

const mockOptions = {
  models: Object.values(models),
  rootPath: join(__dirname, '__fixtures__'),
};

describe('watheia.content-api', () => {
  describe('#resolve()', () => {
    it('fully resolves all content entries with the provided schema', async () => {
      const api = await LocalContentApi.create(mockOptions);
      expect(api).toBeInstanceOf(LocalContentApi);
      expect(api.objectsById).toMatchSnapshot();
    });
  });
});
