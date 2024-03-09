import toml from '@iarna/toml';
import { globSync } from 'fast-glob';
import { readFileSync } from 'fs';
import { readFile } from 'fs-extra';
import yaml from 'js-yaml';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import { extname, join } from 'path';

type Entry = Record<string, unknown>;

export const MARKDOWN_FILE_EXTENSIONS = ['md', 'mdx', 'markdown'];
export const DATA_FILE_EXTENSIONS = ['yml', 'yaml', 'json', 'toml'];
export const SUPPORTED_FILE_EXTENSIONS = [...MARKDOWN_FILE_EXTENSIONS, ...DATA_FILE_EXTENSIONS];

const frontMatterTypes = [
  {
    type: 'yaml',
    startDelimiter: '---\n',
    endDelimiter: '\n---',
    parse: (str: string) => yaml.load(str, { schema: yaml.JSON_SCHEMA }),
  },
  {
    type: 'toml',
    startDelimiter: '+++\n',
    endDelimiter: '\n+++',
    parse: (str: string) => toml.parse(str),
  },
  {
    type: 'jsonmd',
    startDelimiter: '---json\n',
    endDelimiter: '\n---',
    parse: (str: string) => JSON.parse(str),
  },
  {
    type: 'json',
    startDelimiter: '{\n',
    endDelimiter: '\n}',
    parse: (str: string) => JSON.parse(`{${str}}`),
  },
];

function parseMarkdownWithFrontMatter(content: string): Entry {
  content = content.replace('\r\n', '\n');
  let frontmatter = null;
  let markdown = content;

  forEach(frontMatterTypes, (fmType) => {
    if (content.startsWith(fmType.startDelimiter)) {
      const index = content.indexOf(fmType.endDelimiter);
      if (index !== -1) {
        // The end delimiter must be followed by EOF or by a new line (possibly preceded with spaces)
        // For example ("." used for spaces):
        //   |---
        //   |title: Title
        //   |---...
        //   |
        //   |Markdown Content
        //   |
        // "index" points to the beginning of the second "---"
        // "endDelimEndIndex" points to the end of the second "---"
        // "afterEndDelim" is everything after the second "---"
        // "afterEndDelimMatch" is the matched "...\n" after the second "---"
        // frontmatter will be: {title: "Title"}
        // markdown will be "\nMarkdown Content\n" (the first \n after end delimiter is discarded)
        const endDelimEndIndex = index + fmType.endDelimiter.length;
        const afterEndDelim = content.substring(endDelimEndIndex);
        const afterEndDelimMatch = afterEndDelim.match(/^\s*?(\n|$)/);
        if (afterEndDelimMatch) {
          const data = content.substring(fmType.startDelimiter.length, index);
          frontmatter = fmType.parse(data);
          markdown = afterEndDelim.substring(afterEndDelimMatch[0].length);
        }
      }
    }
  });
  return {
    ...(frontmatter ?? {}),
    content: markdown,
  };
}

function parseDataByFilePath(rawContent: string, filePath: string): Entry {
  const extension = extname(filePath).substring(1);
  let data;
  switch (extension) {
    case 'yml':
    case 'yaml':
      rawContent = rawContent.replace(/\n---\s*$/, '');
      data = yaml.safeLoad(rawContent, { schema: yaml.JSON_SCHEMA });
      break;
    case 'json':
      data = JSON.parse(rawContent);
      break;
    case 'toml':
      data = toml.parse(rawContent);
      break;
    case 'markdown':
    case 'mdx':
    case 'md':
      data = parseMarkdownWithFrontMatter(rawContent);
      break;
    case 'js':
    case 'jsx':
      data = rawContent;
      break;
    default:
      throw new Error(
        `parseDataByFilePath error, extension '${extension}' of file ${filePath} is not supported`
      );
  }
  return data;
}

export async function parseFile(filePath: string): Promise<Entry> {
  return await readFile(filePath, 'utf8').then((rawContent: string) => {
    return parseDataByFilePath(rawContent, filePath);
  });
}

export function parseFileSync(filePath: string): Entry {
  const rawContent = readFileSync(filePath, 'utf8');
  return parseDataByFilePath(rawContent, filePath);
}

export function readDirRecursively(
  rootPath: string,
  contentDirs: string[] = ['content/data', 'content/pages'],
  allowedExtensions: string[] = SUPPORTED_FILE_EXTENSIONS
): Record<string, Entry> {
  console.log(
    'readDirRecursively(rootPath, contentDirs, allowedExtensions)',
    rootPath,
    contentDirs,
    allowedExtensions
  );

  const globStr = `**/*.{${allowedExtensions.join(',')}}`;
  const sources = contentDirs.map((path) => `${path}/${globStr}`);

  return reduce(
    globSync(sources, { cwd: rootPath }),
    (entriesById, filePath) => {
      return { ...entriesById, [filePath]: parseFileSync(join(rootPath, filePath)) };
    },
    {}
  );
}
