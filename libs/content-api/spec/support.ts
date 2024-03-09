import { join } from 'path';

export const FIXTURES_DIR = join(__dirname, '__fixtures__');

export function fixturePath(path: string) {
  return join(FIXTURES_DIR, path);
}
