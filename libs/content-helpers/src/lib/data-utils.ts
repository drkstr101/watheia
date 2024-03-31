import { DocumentEntry, PageEntry, types } from '@watheia/content-model';

export function getAllPostsSorted(objects: DocumentEntry[]): types.Article[] {
  const allPosts = getAllPosts(objects);
  return sortPosts(allPosts);
}

export function getAllPosts(objects: DocumentEntry[]): types.Article[] {
  return objects.filter((object) => object.type === 'Article') as types.Article[];
}

export function getAllFeaturedPostsSorted(objects: DocumentEntry[]): types.Article[] {
  const allPosts = getAllPosts(objects);
  const featuredPosts = allPosts.filter((post) => post.isFeatured === true);
  return sortPosts(featuredPosts);
}

export function getAllNonFeaturedPostsSorted(objects: DocumentEntry[]): types.Article[] {
  const allPosts = getAllPosts(objects);
  const nonFeaturedPosts = allPosts.filter((post) => post.isFeatured !== true);
  return sortPosts(nonFeaturedPosts);
}

export function sortPosts(posts: types.Article[]): types.Article[] {
  return posts.sort(
    (postA: { date: string | number | Date }, postB: { date: string | number | Date }) =>
      new Date(postB.date).getTime() - new Date(postA.date).getTime()
  );
}

export function isPublished(page: PageEntry): boolean {
  return !page.isDraft;
}

export function getRootPagePath(pagePath: string): string {
  const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
  if (!pagedPathMatch) {
    return pagePath;
  }
  return pagePath.substring(0, pagedPathMatch.index);
}

export function generatePagedPathsForPage(
  page: PageEntry,
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
  page: PageEntry,
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
