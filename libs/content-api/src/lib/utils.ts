import toml from '@iarna/toml';
import { DocumentEntry } from '@watheia/content-model';
import { globSync } from 'fast-glob';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import trim from 'lodash/trim';
import { extname, join } from 'path';

type Data = Record<string, unknown>;

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

function parseMarkdownWithFrontMatter(content: string): Data {
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
    markdown_content: trim(markdown),
  };
}

function parseDataByFilePath(rawContent: string, filePath: string): Data {
  const extension = extname(filePath).substring(1);
  let data;
  switch (extension) {
    case 'yml':
    case 'yaml':
      rawContent = rawContent.replace(/\n---\s*$/, '');
      data = yaml.load(rawContent, { schema: yaml.JSON_SCHEMA });
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

async function outputDataIfNeeded(filePath, data) {
  const res = stringifyDataByFilePath(data, filePath);
  const fileExists = await fse.pathExists(filePath);
  const existingContent = fileExists ? await fse.readFile(filePath, 'utf8') : null;
  if (!fileExists || res !== existingContent) {
    await fse.outputFile(filePath, res);
    return true;
  }
  return false;
}

function stringifyDataByFilePath(data, filePath) {
  const extension = path.extname(filePath).substring(1);
  let result;
  switch (extension) {
    case 'yml':
    case 'yaml':
      result = yaml.dump(data, { noRefs: true });
      break;
    case 'json':
      result = JSON.stringify(data, null, 4);
      break;
    case 'toml':
      result = toml.stringify(data);
      break;
    case 'markdown':
    case 'mdx':
    case 'md':
      result =
        '---\n' +
        yaml.dump(data.frontmatter, { noRefs: true }) +
        '---\n' +
        _.get(data, 'markdown', '');
      break;
    case 'js':
    case 'jsx':
      result = data;
      break;
    default:
      throw new Error(
        `stringifyDataByFilePath error, extension '${extension}' of file ${filePath} is not supported`
      );
  }
  return result;
}

export async function parseFile(filePath) {
  return await readFile(filePath, 'utf8').then((data) => {
    return parseDataByFilePath(data, filePath);
  });
}

export function parseFileSync(filePath: string): Data {
  const rawContent = readFileSync(filePath, 'utf8');
  return parseDataByFilePath(rawContent, filePath);
}

export function readDirRecursively(
  rootPath: string,
  contentDirs: string[] = ['content/data', 'content/pages'],
  allowedExtensions: string[] = SUPPORTED_FILE_EXTENSIONS
): Record<string, DocumentEntry> {
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

import { readDirRecursivelyWithExtensions } from '@stackbit/utils';
import type { Document, DocumentField, Logger } from '@watheia/content-model';
import axios from 'axios';
import fse from 'fs-extra';
import { readFile } from 'fs/promises';
import _ from 'lodash';
import path from 'path';
import slugify from 'slugify';
import { Readable } from 'stream';

export function sanitizeSlug(slug: string): string {
  return slug
    .split('/')
    .map((part) => slugify(part, { lower: true }))
    .join('/');
}

export function convertToRegularTokens(input: string): string {
  return input.replace(/%([^%]+)%/g, (match, tokenName) => `{${tokenName}}`);
}

export function extractTokensFromString(input: string): string[] {
  return input.match(/(?<={)[^}]+(?=})/g) || [];
}

/**
 * Interpolates url or file path pattern from data.
 * If token does not exist in data returns original token.
 *
 * @example
 * interpolateFileName('posts/{slug}', { slug: 'hello' })
 * => 'posts/hello'
 * interpolateFileName('_posts/{moment_format("YYYY-MM-DD")}-{slug}.md', { slug: 'hello' })
 * => '_posts/2020-11-16-hello.md'
 *
 * @param {string} pathTemplate
 * @param {Object} data
 * @return {string}
 */
export function interpolatePath(pathTemplate: string, data: Record<string, any>) {
  const interpolatedPath = convertToRegularTokens(pathTemplate).replace(
    /{(.*?)}/g,
    (match, tokenName) => {
      return sanitizeSlug(_.get(data, tokenName, `{${tokenName}}`));
    }
  );
  return path.normalize(interpolatedPath);
}

export async function getFileDates(
  filePath: string
): Promise<{ createdAt: string; updatedAt: string }> {
  let fileStats: fse.Stats | null = null;
  try {
    fileStats = await fse.stat(filePath);
  } catch (err) {
    // pass
  }
  return {
    createdAt: (fileStats?.birthtime ?? fileStats?.mtime ?? new Date()).toISOString(),
    updatedAt: (fileStats?.mtime ?? new Date()).toISOString(),
  };
}

export async function getFileData(filePath: string): Promise<any> {
  const extension = path.extname(filePath).substring(1);
  let data = await parseFile(filePath);
  if (
    MARKDOWN_FILE_EXTENSIONS.includes(extension) &&
    _.has(data, 'frontmatter') &&
    _.has(data, 'markdown')
  ) {
    data = {
      ...(data['frontmatter'] ?? {}),
      markdown_content: data['markdown'],
    };
  }
  return data;
}

export async function saveFileData(filePath: string, data: any): Promise<boolean> {
  let dataToWrite = data;
  const extension = path.extname(filePath).substring(1);
  if (MARKDOWN_FILE_EXTENSIONS.includes(extension)) {
    const existingData = (await fse.pathExists(filePath)) ? await parseFile(filePath) : {};
    dataToWrite = {
      ...existingData,
      markdown: data.markdown_content,
      frontmatter: _.omit(data, ['markdown_content']),
    };
  }
  return outputDataIfNeeded(filePath, dataToWrite);
}

export async function saveBase64Data(filePath: string, data: string): Promise<void> {
  const buffer = Buffer.from(data, 'base64');
  const readStream = Readable.from(buffer);
  await fse.ensureDir(path.dirname(filePath));
  const writeStream = fse.createWriteStream(filePath);
  readStream.pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream.on('error', reject).on('finish', resolve);
  });
}

export async function saveFromUrl(filePath: string, url: string): Promise<void> {
  const response = await axios({
    responseType: 'stream',
    url,
  });
  await fse.ensureDir(path.dirname(filePath));
  const writeStream = fse.createWriteStream(filePath);
  response.data.pipe(writeStream);
  return new Promise((resolve, reject) => {
    writeStream.on('error', reject).on('finish', resolve);
  });
}

export function processMarkdownImagePaths(
  markdown: string,
  handler: (imagePath: string) => string
): string {
  const re = /(!\[[^\]]*])\(([^)\s]+?)(\s+"[^"]*")?\)/g;
  let reResult;
  let result = '';
  let lastIndex = 0;
  while ((reResult = re.exec(markdown)) !== null) {
    const altText = reResult[1];
    const path = handler(reResult[2]!);
    const title = reResult[3] || '';
    result += markdown.substring(lastIndex, reResult.index);
    result += `${altText}(${path}${title})`;
    lastIndex = re.lastIndex;
  }
  result += markdown.substring(lastIndex);
  return result;
}

export function extractTokensAndValuesFromFilePath(
  filePath: string,
  filePathPattern: string
): Record<string, string> {
  // filePath: '_posts/2020-11-04-hello.md'
  // filePathPattern: '_posts/{moment_format("YYYY-MM-DD")}-{slug}.md'
  const usedTokens: Record<string, boolean> = {};
  const regExpStr = filePathPattern
    // escape characters that may conflict with regular expression
    .replace(/[\\.*+\-?^$|()[\]]/g, '\\$&')
    // replace tokens with named capturing group: (?<token>x)
    .replace(
      /{([^}]+)}(\/?)/g,
      (match, tokenName: string, slashAfter: string, offset: number) => {
        // if token was used, assume it has the same value
        // _posts/{slug}/{moment_format("YYYY-MM-DD")}-{slug}.md
        // _posts/welcome-to-jekyll/2020-08-29-welcome-to-jekyll.md
        if (_.has(usedTokens, tokenName)) {
          return `(?:.+?)${slashAfter}`;
        }
        usedTokens[tokenName] = true;
        // if token is left and right bounded by slashes or the beginning
        // of the string: /pages/{slug}/index.md, then generate regular
        // expression that puts the whole token with the following slash
        // as an optional match: /\/pages\/(?:(?<slug>.+?)/)?\/index.md/
        // Such that the following file path will match '/pages/index.md'
        // this regular expression and produce a match with 'undefined' slug
        // named capturing group which will be converted to an empty string.
        const tokenLeftBounded = offset === 0 || filePathPattern[offset - 1] === '/';
        const tokenRightBounded = slashAfter === '/';
        if (tokenLeftBounded && tokenRightBounded) {
          return `(?:(?<${tokenName}>.+?)/)?`;
        }
        return `(?<${tokenName}>.+?)${slashAfter}`;
      }
    );
  // regExpStr = '_posts/(?<moment_date>\d+-\d+-\d+)-(?<slug>.+?)\.md'
  const regExp = new RegExp(regExpStr);
  // regExp = /_posts\/(?<moment_date>\d+-\d+-\d+)-(?<slug>.+?)\.md/
  const match = regExp.exec(filePath);
  // match.groups = {slug: 'hello', moment_date: <DateString>}
  return _.mapValues(match?.groups, (value) => (typeof value === 'undefined' ? '' : value));
}

type ForEachFieldHandler = (
  field: DocumentField,
  fieldPath: (string | number)[]
) => Promise<void>;

export async function forEachFieldInDocument(
  document: Document,
  handler: ForEachFieldHandler
): Promise<void> {
  return forEachFieldInFields(document.fields, [], handler);
}

export async function forEachFieldInFields(
  documentFields: Record<string, DocumentField>,
  fieldPath: (string | number)[],
  handler: ForEachFieldHandler
) {
  for (const [fieldName, field] of Object.entries(documentFields)) {
    await forEachField(field, fieldPath.concat(fieldName), handler);
  }
}

async function forEachField(
  documentField: DocumentField,
  fieldPath: (string | number)[],
  handler: ForEachFieldHandler
) {
  switch (documentField.type) {
    case 'string':
    case 'text':
    case 'html':
    case 'slug':
    case 'url':
    case 'color':
    case 'boolean':
    case 'number':
    case 'date':
    case 'datetime':
    case 'enum':
    case 'file':
    case 'json':
    case 'style':
    case 'markdown':
    case 'image':
    case 'reference':
    case 'cross-reference':
    case 'richText': {
      if (documentField.localized) {
        if (_.isEmpty(documentField.locales)) {
          return;
        }
        for (const locale of Object.values(documentField.locales)) {
          await handler(locale, fieldPath.concat(locale.locale));
        }
      } else {
        await handler(documentField, fieldPath);
      }
      break;
    }
    case 'model':
    case 'object': {
      if (documentField.localized) {
        if (_.isEmpty(documentField.locales)) {
          return;
        }
        for (const locale of Object.values(documentField.locales)) {
          await forEachFieldInFields(locale.fields, fieldPath.concat(locale.locale), handler);
        }
      } else {
        await forEachFieldInFields(documentField.fields, fieldPath, handler);
      }
      break;
    }
    case 'list': {
      if (documentField.localized) {
        if (_.isEmpty(documentField.locales)) {
          return;
        }
        for (const locale of Object.values(documentField.locales)) {
          for (const [index, item] of locale.items.entries()) {
            await forEachField(item, fieldPath.concat(locale.locale, index), handler);
          }
        }
      } else {
        for (const [index, item] of documentField.items.entries()) {
          await forEachField(item, fieldPath.concat(index), handler);
        }
      }
      break;
    }
    default: {
      const _exhaustiveCheck: never = documentField;
      return _exhaustiveCheck;
    }
  }
}

export async function readFilesFromDirectory(
  directoryPath: string,
  logger: Logger,
  handler: (relFilePath: string, fullFilePath: string, data: any) => Promise<void>
): Promise<void> {
  const filePaths = await readDirRecursivelyWithExtensions(
    directoryPath,
    SUPPORTED_FILE_EXTENSIONS
  );
  for (const filePath of filePaths) {
    const fullFilePath = path.join(directoryPath, filePath);
    let data;
    try {
      data = await getFileData(fullFilePath);
      await handler(filePath, fullFilePath, data);
    } catch (err) {
      logger.warn('Error loading file: ' + filePath, err);
      continue;
    }
  }
}
