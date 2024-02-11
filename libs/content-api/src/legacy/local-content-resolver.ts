// import model from '@watheia/content-model';
// import { globSync } from 'fast-glob';
// import frontmatter from 'front-matter';
// import { readFileSync } from 'fs';
// import path from 'path';
// import { LocalContentSchema } from '../content-api.types';

// // TODO use types?

// // const pagesDir = sbConfig.pagesDir || 'content/pages';
// // const dataDir = sbConfig.dataDir || 'content/data';

// const allReferenceFields = {};

// const supportedFileTypes = ['md', 'json'];

// const globString = `**/*.{${supportedFileTypes.join(',')}}`;

// function contentFilesInPath(cwd: string) {
//   const source = [`content/data/${globString}`, `content/pages/${globString}`];
//   return globSync(source, { cwd }).map(readContent);
// }

// function readContent(file: string) {
//   const rawContent = readFileSync(file, 'utf8');
//   switch (path.extname(file).substring(1)) {
//     case 'md':
//       // eslint-disable-next-line no-case-declarations
//       const parsedMd = frontmatter<Record<string, unknown>>(rawContent);
//       return {
//         ...parsedMd.attributes,
//         content: parsedMd.body,
//         __metadata: { id: file },
//       };
//     case 'json':
//       return { ...JSON.parse(rawContent), __metadata: { id: file } };
//     default:
//       throw Error(`Unhandled file type: ${file}`);
//   }
// }

// export function fetchDocuments(schema: LocalContentSchema) {
//   const documents = contentFilesInPath(schema.rootPath);
//   const fileToContent = Object.fromEntries(documents.map((e) => [e.__metadata.id, e]));

//   documents.forEach((e) => resolveReferences(e, fileToContent));
//   return documents;

//   // pages.forEach((page) => {
//   //   page.__metadata.urlPath = getPageUrl(page);
//   // });

//   // const site = data.find((e) => e.__metadata.modelName === model.Config.name);
//   // return { objects, pages, props: { site: siteConfig } };
// }
