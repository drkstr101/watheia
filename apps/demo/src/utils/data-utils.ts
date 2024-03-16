type DebugContext = {
  keyPath: (string | number)[];
  stack: Record<string, any>[];
};

export function getAllPostsSorted(objects: any) {
  const allPosts = getAllPosts(objects);
  return sortPosts(allPosts);
}

export function getAllCategoryPostsSorted(objects: any, categoryId: any) {
  const allPosts = getAllPosts(objects);
  const categoryPosts = allPosts.filter(
    (post: { category: any }) => post.category === categoryId
  );
  return sortPosts(categoryPosts);
}

export function getAllPosts(objects: any[]) {
  return objects.filter(
    (object: { __metadata: { modelName: string } }) => object.__metadata?.modelName === 'Article'
  );
}

export function getAllFeaturedPostsSorted(objects: any) {
  const allPosts = getAllPosts(objects);
  const featuredPosts = allPosts.filter(
    (post: { isFeatured: boolean }) => post.isFeatured === true
  );
  return sortPosts(featuredPosts);
}

export function getAllNonFeaturedPostsSorted(objects: any) {
  const allPosts = getAllPosts(objects);
  const nonFeaturedPosts = allPosts.filter(
    (post: { isFeatured: boolean }) => post.isFeatured !== true
  );
  return sortPosts(nonFeaturedPosts);
}

export function sortPosts(posts: any[]) {
  return posts.sort(
    (postA: { date: string | number | Date }, postB: { date: string | number | Date }) =>
      new Date(postB.date).getTime() - new Date(postA.date).getTime()
  );
}

export function isPublished(page: { isDraft: any }) {
  return !page.isDraft;
}

export function resolveReferences(
  object: any,
  fieldPaths: any[],
  objects: any,
  debugContext: DebugContext = { keyPath: [], stack: [] }
) {
  const _resolveDeep: any = (
    value: any,
    fieldNames: string | any[],
    debugContext: DebugContext
  ) => {
    if (typeof value === 'string') {
      const result = findObjectById(value, objects, debugContext);
      return _resolveDeep(result, fieldNames, debugContext);
    } else if (Array.isArray(value)) {
      return value
        .map((item, index) =>
          _resolveDeep(item, fieldNames, {
            keyPath: debugContext.keyPath.concat(index),
            stack: debugContext.stack.concat([value]),
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
      keyPath: debugContext.keyPath.concat(fieldName),
      stack: debugContext.stack.concat(value),
    });
    return {
      ...value,
      [fieldName]: result,
    };
  };

  return fieldPaths.reduce((object: any, fieldPath: string) => {
    const fieldNames = fieldPath.split('.');
    return _resolveDeep(object, fieldNames, debugContext);
  }, object);
}

export function resolveReferenceField(
  object: Record<string, any>,
  fieldName: string,
  objects: Record<string, any>[],
  debugContext: DebugContext = { keyPath: [], stack: [] }
) {
  if (!(fieldName in object)) {
    return object;
  }
  const result = findObjectById(object[fieldName], objects, {
    keyPath: debugContext.keyPath.concat(fieldName),
    stack: debugContext.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

export function resolveReferenceArray(
  object: Record<string, any>,
  fieldName: string,
  objects: Record<string, any>[],
  debugContext: DebugContext
) {
  if (!(fieldName in object)) {
    return object;
  }
  const result = mapObjectsById(object[fieldName], objects, {
    keyPath: debugContext.keyPath.concat(fieldName),
    stack: debugContext.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

export function mapObjectsById(
  objectIds: string[],
  objects: Record<string, any>[],
  debugContext: DebugContext
) {
  return (objectIds ?? [])
    .map((objectId: string, index: number) =>
      findObjectById(objectId, objects, {
        keyPath: debugContext.keyPath.concat(index),
        stack: debugContext.stack.concat([objectIds]),
      })
    )
    .filter(Boolean);
}

export function findObjectById(
  objectId: string,
  objects: Record<string, any>[],
  debugContext: DebugContext
) {
  if (!objectId) {
    return null;
  }
  const object = objects.find((object) => object.__metadata?.id === objectId) || null;
  if (!object && debugContext) {
    const reverseStack = debugContext.stack.slice().reverse();
    const objectIndex = reverseStack.findIndex((object) => !!object.__metadata?.relProjectPath);
    if (objectIndex >= 0) {
      const filePath = reverseStack[objectIndex].__metadata.relProjectPath;
      const fieldPath = debugContext.keyPath
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

export function getRootPagePath(pagePath: string) {
  const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
  if (!pagedPathMatch) {
    return pagePath;
  }
  return pagePath.substring(0, pagedPathMatch.index);
}

export function generatePagedPathsForPage(
  page: { __metadata: { urlPath: any } },
  items: string | any[],
  numOfItemsPerPage: number
) {
  const pageUrlPath = page.__metadata?.urlPath;
  if (numOfItemsPerPage === 0) {
    return [pageUrlPath];
  }
  const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
  const paths: any[] = [];
  for (let i = 0; i < numOfPages; i++) {
    paths.push(i === 0 ? pageUrlPath : `${pageUrlPath}/page/${i + 1}`);
  }
  return paths;
}

export function getPagedItemsForPage(
  page: any,
  items: string | any[],
  numOfItemsPerPage: number
) {
  const pageUrlPath = page.__metadata?.urlPath;
  const baseUrlPath = getRootPagePath(pageUrlPath);
  if (numOfItemsPerPage === 0) {
    return {
      pageIndex: 0,
      baseUrlPath,
      numOfPages: 1,
      numOfTotalItems: items.length,
      items: items,
    };
  }
  const pageIndexMatch = pageUrlPath.match(/\/page\/(\d+)$/);
  const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1]) - 1 : 0;
  const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
  const startIndex = pageIndex * numOfItemsPerPage;
  const endIndex = startIndex + numOfItemsPerPage;
  return {
    pageIndex,
    baseUrlPath,
    numOfPages: numOfPages,
    numOfTotalItems: items.length,
    items: items.slice(startIndex, endIndex),
  };
}

export async function mapDeepAsync(
  value: any,
  iteratee: {
    (value: any, keyPath: any, stack: any): Promise<any>;
    (arg0: any, arg1: any, arg2: any): any;
  },
  options: { postOrder?: boolean } = {}
) {
  const postOrder = options?.postOrder ?? false;
  async function _mapDeep(
    value: any,
    keyPath: (string | number)[],
    stack: Record<string, any>[]
  ): Promise<any> {
    if (!postOrder) {
      value = await iteratee(value, keyPath, stack);
    }
    const childrenIterator = (val: any, key: string | number) => {
      return _mapDeep(val, keyPath.concat(key), stack.concat([value]));
    };
    if (value && typeof value == 'object' && value.constructor === Object) {
      const res: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        res[key] = await childrenIterator(val, key);
      }
      value = res;
    } else if (Array.isArray(value)) {
      value = await Promise.all(value.map(childrenIterator));
    }
    if (postOrder) {
      value = await iteratee(value, keyPath, stack);
    }
    return value;
  }
  return _mapDeep(value, [], []);
}
