import { ALL_MODEL_NAMES, models, types } from '../src/index';

describe('watheia.content-model', () => {
  it('exports all models', () => {
    expect(models).toBeObject();
    expect(models).toContainKeys(Array.from(ALL_MODEL_NAMES));
  });
  it('exports all types', () => {
    expect(types).toBeObject();
  });
});
