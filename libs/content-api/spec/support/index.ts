import { Logger } from '@watheia/content-model';
import { join } from 'path';

export const FIXTURES_DIR = join(__dirname, '../__fixtures__');

const noop = (message: string) => {
  console.log(message);
};

export function createMockedLogger(): jest.Mocked<Logger> {
  const mockedLogger: jest.Mocked<Logger> = {
    createLogger: jest.fn(({ label }: { label: string }): Logger => {
      return mockedLogger;
    }),
    error: jest.fn(noop),
    warn: jest.fn(noop),
    info: jest.fn(noop),
    debug: jest.fn(noop),
  };
  return mockedLogger;
}

export function fixturePath(path: string) {
  return join(FIXTURES_DIR, path);
}
