import {
  generatePagedPathsForPage,
  getAllCategoryPostsSorted,
  getAllNonFeaturedPostsSorted,
  isPublished,
} from '@watheia/content-helpers';
import { ContentCache } from '../content-api.types';

export function resolveStaticPaths({ pages, objects }: ContentCache) {
  return pages.reduce((paths, page) => {
    if (!process.env['stackbitPreview'] && page.isDraft) {
      return paths;
    }
    const objectType = page.type as keyof typeof StaticPathsResolvers;
    const pageUrlPath = page.__metadata?.urlPath;
    if (objectType && StaticPathsResolvers[objectType]) {
      const resolver = StaticPathsResolvers[objectType];
      return paths.concat(resolver(page, objects));
    }
    return paths.concat(pageUrlPath);
  }, [] as string[]);
}

const StaticPathsResolvers = {
  PostFeedLayout: (page: any, objects: any[]) => {
    let posts = getAllNonFeaturedPostsSorted(objects);
    if (!process.env['stackbitPreview']) {
      posts = posts.filter(isPublished);
    }
    const numOfPostsPerPage = page.numOfPostsPerPage ?? 10;
    return generatePagedPathsForPage(page, posts, numOfPostsPerPage);
  },
  PostFeedCategoryLayout: (
    page: { __metadata: any; numOfPostsPerPage?: any },
    objects: any[]
  ) => {
    const categoryId = page.__metadata?.id;
    const numOfPostsPerPage = page.numOfPostsPerPage ?? 10;
    let categoryPosts = getAllCategoryPostsSorted(objects, categoryId);
    if (!process.env['stackbitPreview']) {
      categoryPosts = categoryPosts.filter(isPublished);
    }
    return generatePagedPathsForPage(page, categoryPosts, numOfPostsPerPage);
  },
};
