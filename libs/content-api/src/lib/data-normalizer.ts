// import { Model, ModelName } from '@watheia/content-model';
// import { LocalContentSchema } from '../content-api.types';

// type Entry = Record<string, unknown>;

// function getMetaData(data: Entry, model: Model, relPath: string) {
//   if (model.type === 'page') {
//     const urlPath = model.urlPath ?? '/{slug}';
//     const slug = (data['slug'] as string) ?? '';
//     return {
//       id: relPath,
//       type: model.type,
//       urlPath: urlPath.replace('{slug}', slug),
//     };
//   }

//   return { id: relPath, type: model.type };
// }

// export function withDataNormalizer(
//   schema: LocalContentSchema,
//   documentsById: Record<string, Entry>
// ) {
//   // collect reference fields for models
//   const referenceFields: Record<string, boolean> = {};
//   schema.models.forEach((model) => {
//     model.fields?.forEach((field) => {
//       if (
//         field.type === 'reference' ||
//         (field.type === 'list' && field.items?.type === 'reference')
//       ) {
//         referenceFields[model.name + ':' + field.name] = true;
//       }
//     });
//   });

//   const isRefField = (modelName: string, fieldName: string) =>
//     !!referenceFields[modelName + ':' + fieldName];

//   function normalizeData(data: Record<string, any>, model: Model, relPath: string) {
//     if (!data || !data['type']) return;

//     if (!data['__metadata']) data['__metadata'] = getMetaData(data, model, relPath);

//     const modelName = data['type'] as ModelName;
//     // Make Sourcebit-compatible
//     // if (!data.__metadata) data.__metadata = { modelName: data.type };

//     for (const fieldName in data) {
//       if (fieldName === '__metadata') continue;

//       let fieldValue = data[fieldName];
//       if (!fieldValue) continue;

//       const isRef = isRefField(modelName, fieldName);
//       if (Array.isArray(fieldValue)) {
//         if (fieldValue.length === 0) continue;
//         if (isRef && typeof fieldValue[0] === 'string') {
//           fieldValue = fieldValue.map((filename) => documentsById[filename]);
//           data[fieldName] = fieldValue;
//         }
//         if (typeof fieldValue[0] === 'object') {
//           fieldValue.forEach((o) => normalizeData(o, model, relPath));
//         }
//       } else {
//         if (isRef && typeof fieldValue === 'string') {
//           fieldValue = documentsById[fieldValue];
//           data[fieldName] = fieldValue;
//         }
//         if (typeof fieldValue === 'object') {
//           normalizeData(fieldValue, model, relPath);
//         }
//       }
//     }
//   }

//   return async ([relPath, data]: [string, Entry]) => {
//     // console.log(`Resolving:`, file);

//     const modelName = data['type'] as ModelName;
//     const model = schema.models.find((m) => m.name === modelName);
//     if (!model) {
//       throw new Error(`Unhandled model type (${modelName}) found in ${relPath}`);
//     }

//     normalizeData(data, model, relPath);
//   };
// }
