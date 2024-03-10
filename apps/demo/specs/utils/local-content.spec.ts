import { allContent } from '../../src/utils/local-content';

describe('local-content', () => {
  describe('allContent', () => {
    it('fully resolves a local content directory', () => {
      const data = allContent();
      expect(data).toBeObject();
      expect(data).toMatchSnapshot();
    });
  });
});
