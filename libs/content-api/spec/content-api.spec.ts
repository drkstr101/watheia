import { join } from 'path';
import { LocalContentApi, defaultOptions } from '../src/content-api';

const mockOptions = {
  ...defaultOptions,
  rootPath: join(__dirname, '__fixtures__'),
};

describe('watheia.content-api', () => {
  describe('#resolve()', () => {
    it('fully resolves all content entries with the provided schema', async () => {
      const api = await LocalContentApi.resolve(mockOptions);
      expect(api).toBeInstanceOf(LocalContentApi);
      expect(api.documents).toMatchSnapshot();
    });
  });
});
