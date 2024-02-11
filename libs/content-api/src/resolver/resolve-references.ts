import defaultModel, { type Model } from '@watheia/content-model';

/**
 * Run side-affects on import to populate reference fields
 */
const allReferenceFields = (function (model: Record<string, Model>) {
  const referenceFields: Record<string, boolean> = {};
  Object.entries(model).forEach(([modelName, model]) => {
    model.fields?.forEach((field) => {
      if (
        field.type === 'reference' ||
        (field.type === 'list' && field.items?.type === 'reference')
      ) {
        referenceFields[modelName + ':' + field.name] = true;
      }
    });
  });

  return referenceFields;
})(defaultModel);

function isRefField(modelName: string, fieldName: string) {
  return !!allReferenceFields[modelName + ':' + fieldName];
}

export function resolveReferences(content, fileToContent) {
  // console.log('resolveReferences(content, fileToContent)', content, fileToContent);
  if (!content || !content.type) return;

  const modelName = content.type;
  // Make Sourcebit-compatible
  if (!content.__metadata) content.__metadata = { modelName: content.type };

  for (const fieldName in content) {
    let fieldValue = content[fieldName];
    if (!fieldValue) continue;

    const isRef = isRefField(modelName, fieldName);
    if (Array.isArray(fieldValue)) {
      if (fieldValue.length === 0) continue;
      if (isRef && typeof fieldValue[0] === 'string') {
        fieldValue = fieldValue.map((filename) => fileToContent[filename]);
        content[fieldName] = fieldValue;
      }
      if (typeof fieldValue[0] === 'object') {
        fieldValue.forEach((o) => resolveReferences(o, fileToContent));
      }
    } else {
      if (isRef && typeof fieldValue === 'string') {
        fieldValue = fileToContent[fieldValue];
        content[fieldName] = fieldValue;
      }
      if (typeof fieldValue === 'object') {
        resolveReferences(fieldValue, fileToContent);
      }
    }
  }
}
