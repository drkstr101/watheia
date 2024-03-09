// import frontmatter from 'front-matter';
// import * as fs from 'fs';
// import glob from 'glob';
// import path from 'path';
// import { allModels } from '../../sources/local/models';
// import sbConfig from '../../stackbit.config';
// // import { Config } from '../../sources/local/models/Config';
// import { LocalContentSchema } from '../content-api.types';
// import { getPageUrl } from './page-utils';

// // TODO use types?

// const pagesDir = sbConfig.pagesDir || 'content/pages';
// const dataDir = sbConfig.dataDir || 'content/data';

// const allReferenceFields = {};
// Object.entries(allModels).forEach(([modelName, model]) => {
//   model.fields.forEach((field) => {
//     if (
//       field.type === 'reference' ||
//       (field.type === 'list' && field.items?.type === 'reference')
//     ) {
//       allReferenceFields[modelName + ':' + field.name] = true;
//     }
//   });
// });

// function isRefField(modelName: string, fieldName: string) {
//   return !!allReferenceFields[modelName + ':' + fieldName];
// }

// const supportedFileTypes = ['md', 'json'];
// function contentFilesInPath(dir: string) {
//   const globPattern = `${dir}/**/*.{${supportedFileTypes.join(',')}}`;
//   return glob.sync(globPattern);
// }

// function readContent(file: string) {
//   const rawContent = fs.readFileSync(file, 'utf8');
//   let content = null;
//   switch (path.extname(file).substring(1)) {
//     case 'md':
//       const parsedMd = frontmatter<Record<string, any>>(rawContent);
//       content = {
//         ...parsedMd.attributes,
//         content: parsedMd.body,
//       };
//       break;
//     case 'json':
//       content = JSON.parse(rawContent);
//       break;
//     default:
//       throw Error(`Unhandled file type: ${file}`);
//   }

//   // Make Sourcebit-compatible
//   content.__metadata = {
//     id: file,
//     modelName: content.type,
//   };

//   return content;
// }

// function resolveReferences(content, fileToContent) {
//   if (!content || !content.type) return;

//   const modelName = content.type;
//   // Make Sourcebit-compatible
//   if (!content.__metadata) content.__metadata = { modelName: content.type };

//   for (const fieldName in content) {
//     let fieldValue = content[fieldName];
//     if (!fieldValue) continue;

//     const isRef = isRefField(modelName, fieldName);
//     if (Array.isArray(fieldValue)) {
//       if (fieldValue.length === 0) continue;
//       if (isRef && typeof fieldValue[0] === 'string') {
//         fieldValue = fieldValue.map((filename) => fileToContent[filename]);
//         content[fieldName] = fieldValue;
//       }
//       if (typeof fieldValue[0] === 'object') {
//         fieldValue.forEach((o) => resolveReferences(o, fileToContent));
//       }
//     } else {
//       if (isRef && typeof fieldValue === 'string') {
//         fieldValue = fileToContent[fieldValue];
//         content[fieldName] = fieldValue;
//       }
//       if (typeof fieldValue === 'object') {
//         resolveReferences(fieldValue, fileToContent);
//       }
//     }
//   }
// }

// export function resolveContent(schema: LocalContentSchema) {
//   const [data, pages] = [dataDir, pagesDir].map((dir) => {
//     return contentFilesInPath(dir).map((file) => readContent(file));
//   });
//   const objects = [...pages, ...data];
//   const fileToContent = Object.fromEntries(objects.map((e) => [e.__metadata.id, e]));

//   objects.forEach((e) => resolveReferences(e, fileToContent));

//   pages.forEach((page) => {
//     page.__metadata.urlPath = getPageUrl(page);
//   });

//   const siteConfig = data.find((e) => e.__metadata.modelName === 'Config');
//   return { objects, pages, props: { site: siteConfig } };
// }
