import { glob } from 'fast-glob';

export const SUPPORTED_EXTENSIONS = ['json', 'yml', 'yaml', 'md'];

export const GLOB_STR = `**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`;

export const defaultSources = [
  `content/data/${GLOB_STR}`,
  `content/pages/${GLOB_STR}`,
  'content/pages/**/index.mdx',
];
/**
 * Scan the specified directory
 * @param cwd The root directory to scan
 * @param sources include glob patterns
 * @returns
 */
export async function scanContentDir(cwd: string, source: string | string[] = defaultSources) {
  const paths = await glob(source, { cwd });
  return paths.sort();
}
