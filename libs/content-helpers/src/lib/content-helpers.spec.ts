import { cssClassesFromUrlPath } from './content-helpers';

describe('watheia.content-helpers', () => {
  describe('cssClassesFromUrlPath', () => {
    it('transforms a url path to a css class name', () => {
      const expected = ['page-foo', 'page-foo-bar'];
      const result = cssClassesFromUrlPath('/foo/bar');
      expect(result).toEqual(expected);
    });
  });
});
