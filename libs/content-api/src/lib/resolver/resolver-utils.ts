import { DocumentEntry } from '@watheia/content-model';
import { DebugContext } from '../content-api.types';

/**
 * @deprecated use local-resolver instead
 * @param object
 * @param fieldPaths
 * @param objects
 * @param ctx
 * @returns
 */
export function resolveReferences(
  object: any,
  fieldPaths: string[],
  objects: DocumentEntry[],
  ctx: DebugContext = { keyPath: [], stack: [] }
) {
  const _resolveDeep = (value: any, fieldNames: string[], ctx: DebugContext) => {
    if (typeof value === 'string') {
      const result = findObjectById(value, objects, ctx);
      return _resolveDeep(result, fieldNames, ctx);
    } else if (Array.isArray(value)) {
      return value
        .map((item, index) =>
          _resolveDeep(item, fieldNames, {
            keyPath: ctx.keyPath.concat(index),
            stack: ctx.stack.concat([value]),
          })
        )
        .filter(Boolean);
    }

    if (!value || fieldNames.length === 0) {
      return value;
    }
    const [fieldName, ...tail] = fieldNames;
    if (!(fieldName in value)) {
      return value;
    }
    const result = _resolveDeep(value[fieldName], tail, {
      keyPath: ctx.keyPath.concat(fieldName),
      stack: ctx.stack.concat(value),
    });
    return {
      ...value,
      [fieldName]: result,
    };
  };

  return fieldPaths.reduce((object, fieldPath) => {
    const fieldNames = fieldPath.split('.');
    return _resolveDeep(object, fieldNames, ctx);
  }, object);
}

/**
 * @deprecated for local resolver API
 *
 * @param object
 * @param fieldName
 * @param objects
 * @param ctx
 * @returns
 */
export function resolveReferenceField(
  object: Record<string, any>,
  fieldName: string,
  objects: Record<string, any>[],
  ctx: DebugContext = { keyPath: [], stack: [] }
) {
  if (!(fieldName in object)) {
    return object;
  }
  const result = findObjectById(object[fieldName], objects, {
    keyPath: ctx.keyPath.concat(fieldName),
    stack: ctx.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

/**
 * @deprecated for local resolver API
 * @param object
 * @param fieldName
 * @param objects
 * @param ctx
 * @returns
 */
export function resolveReferenceArray(
  object: Record<string, any>,
  fieldName: string,
  objects: Record<string, any>[],
  ctx: DebugContext
) {
  if (!(fieldName in object)) {
    return object;
  }
  const result = mapObjectsById(object[fieldName], objects, {
    keyPath: ctx.keyPath.concat(fieldName),
    stack: ctx.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

/**
 * @deprecated for local resolver API
 *
 * @param objectIds
 * @param objects
 * @param ctx
 * @returns
 */
export function mapObjectsById(
  objectIds: string[],
  objects: Record<string, any>[],
  ctx: DebugContext
) {
  return (objectIds ?? [])
    .map((objectId: string, index: number) =>
      findObjectById(objectId, objects, {
        keyPath: ctx.keyPath.concat(index),
        stack: ctx.stack.concat([objectIds]),
      })
    )
    .filter(Boolean);
}

/**
 * @deprecated for local resolver API
 *
 * @param objectId
 * @param objects
 * @param ctx
 * @returns
 */
export function findObjectById(
  objectId: string,
  objects: Record<string, any>[],
  ctx: DebugContext
) {
  if (!objectId) {
    return null;
  }
  const object = objects.find((object) => object['__metadata']?.id === objectId) || null;
  if (!object && ctx) {
    const reverseStack = ctx.stack.slice().reverse();
    const objectIndex = reverseStack.findIndex(
      (object) => !!object['__metadata']?.relProjectPath
    );
    if (objectIndex >= 0) {
      const filePath = reverseStack[objectIndex]['__metadata'].relProjectPath;
      const fieldPath = ctx.keyPath
        .slice()
        .reverse()
        .slice(0, objectIndex + 1)
        .reverse()
        .join('.');
      console.warn(
        `The '${objectId}' referenced in file '${filePath}' in field '${fieldPath}' was not found`
      );
    }
  }
  return object;
}
