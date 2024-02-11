// export function getAllPostsSorted(objects) {
//   const allPosts = getAllPosts(objects);
//   return sortPosts(allPosts);
// }

// export function getAllCategoryPostsSorted(objects, categoryId) {
//   const allPosts = getAllPosts(objects);
//   const categoryPosts = allPosts.filter((post) => post.category === categoryId);
//   return sortPosts(categoryPosts);
// }

// export function getAllPosts(objects) {
//   return objects.filter((object) => object.__metadata?.modelName === 'PostLayout');
// }

// export function getAllFeaturedPostsSorted(objects) {
//   const allPosts = getAllPosts(objects);
//   const featuredPosts = allPosts.filter((post) => post.isFeatured === true);
//   return sortPosts(featuredPosts);
// }

// export function getAllNonFeaturedPostsSorted(objects) {
//   const allPosts = getAllPosts(objects);
//   const nonFeaturedPosts = allPosts.filter((post) => post.isFeatured !== true);
//   return sortPosts(nonFeaturedPosts);
// }

// export function sortPosts(posts) {
//   return posts.sort(
//     (postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime()
//   );
// }

// export function isPublished(page) {
//   return !page.isDraft;
// }

// export function resolveReferenceField(
//   object,
//   fieldName,
//   objects,
//   debugContext = { keyPath: [], stack: [] }
// ) {
//   if (!(fieldName in object)) {
//     return object;
//   }
//   const result = findObjectById(object[fieldName], objects, {
//     keyPath: debugContext.keyPath.concat(fieldName),
//     stack: debugContext.stack.concat(object),
//   });
//   return {
//     ...object,
//     [fieldName]: result,
//   };
// }

// export function resolveReferenceArray(object, fieldName, objects, debugContext) {
//   if (!(fieldName in object)) {
//     return object;
//   }
//   const result = mapObjectsById(object[fieldName], objects, {
//     keyPath: debugContext.keyPath.concat(fieldName),
//     stack: debugContext.stack.concat(object),
//   });
//   return {
//     ...object,
//     [fieldName]: result,
//   };
// }

// export function mapObjectsById(objectIds, objects, debugContext) {
//   return (objectIds ?? [])
//     .map((objectId, index) =>
//       findObjectById(objectId, objects, {
//         keyPath: debugContext.keyPath.concat(index),
//         stack: debugContext.stack.concat([objectIds]),
//       })
//     )
//     .filter(Boolean);
// }

// export function getRootPagePath(pagePath) {
//   const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
//   if (!pagedPathMatch) {
//     return pagePath;
//   }
//   return pagePath.substring(0, pagedPathMatch.index);
// }

// export function generatePagedPathsForPage(page, items, numOfItemsPerPage) {
//   const pageUrlPath = page.__metadata?.urlPath;
//   if (numOfItemsPerPage === 0) {
//     return [pageUrlPath];
//   }
//   const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
//   const paths: string[] = [];
//   for (let i = 0; i < numOfPages; i++) {
//     paths.push(i === 0 ? pageUrlPath : `${pageUrlPath}/page/${i + 1}`);
//   }
//   return paths;
// }

// export function getPagedItemsForPage(page, items, numOfItemsPerPage) {
//   const pageUrlPath = page.__metadata?.urlPath;
//   const baseUrlPath = getRootPagePath(pageUrlPath);
//   if (numOfItemsPerPage === 0) {
//     return {
//       pageIndex: 0,
//       baseUrlPath,
//       numOfPages: 1,
//       numOfTotalItems: items.length,
//       items: items,
//     };
//   }
//   const pageIndexMatch = pageUrlPath.match(/\/page\/(\d+)$/);
//   const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1]) - 1 : 0;
//   const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
//   const startIndex = pageIndex * numOfItemsPerPage;
//   const endIndex = startIndex + numOfItemsPerPage;
//   return {
//     pageIndex,
//     baseUrlPath,
//     numOfPages: numOfPages,
//     numOfTotalItems: items.length,
//     items: items.slice(startIndex, endIndex),
//   };
// }

// export async function mapDeepAsync(value, iteratee, options: { postOrder?: boolean } = {}) {
//   const postOrder = options?.postOrder ?? false;
//   async function _mapDeep(value, keyPath, stack) {
//     if (!postOrder) {
//       value = await iteratee(value, keyPath, stack);
//     }
//     const childrenIterator = (val, key) => {
//       return _mapDeep(val, keyPath.concat(key), stack.concat([value]));
//     };
//     if (value && typeof value == 'object' && value.constructor === Object) {
//       const res = {};
//       for (const [key, val] of Object.entries(value)) {
//         res[key] = await childrenIterator(val, key);
//       }
//       value = res;
//     } else if (Array.isArray(value)) {
//       value = await Promise.all(value.map(childrenIterator));
//     }
//     if (postOrder) {
//       value = await iteratee(value, keyPath, stack);
//     }
//     return value;
//   }
//   return _mapDeep(value, [], []);
// }
