import model from '../src/index';

describe('watheia.content-model', () => {
  it('exports a default content model', () => {
    expect(model).toBeInstanceOf(Object);
  });
});
