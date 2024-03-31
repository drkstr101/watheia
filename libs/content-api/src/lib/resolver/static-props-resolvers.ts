import {
  getAllNonFeaturedPostsSorted,
  getAllPostsSorted,
  getPagedItemsForPage,
  getRootPagePath,
  isPublished,
  mapDeepAsync,
} from '@watheia/content-helpers';
import { types } from '@watheia/content-model';
import { ContentCache, DebugContext } from '../content-api.types';
// import { resolveReferences } from './resolver-utils';

export function resolveStaticProps(urlPath: string, data: ContentCache) {
  // get root path of paged path: /blog/page/2 => /blog
  const rootUrlPath = getRootPagePath(urlPath);
  const page = data.pages.find((page) => page.__metadata.urlPath === rootUrlPath);
  if (!page) throw new Error(`Failed to locate page for url path: ${urlPath}`);

  const { __metadata, ...rest } = page;
  const props = {
    page: {
      __metadata: {
        ...__metadata,
        // override urlPath in metadata with paged path: /blog => /blog/page/2
        urlPath,
      },
      ...rest,
    },
    ...data.props,
  };
  return mapDeepAsync(
    props,
    async (value, keyPath, stack) => {
      const objectType = value?.type as keyof typeof StaticPropsResolvers;
      if (objectType && StaticPropsResolvers[objectType]) {
        const resolver = StaticPropsResolvers[objectType];
        return resolver(value, data, { keyPath, stack });
      }
      return value;
    },
    { postOrder: true }
  );
}

const StaticPropsResolvers = {
  // Article: (props: any, data: ContentCache, ctx: DebugContext) => {
  //   return resolveReferences(props, ['author'], data.objects, ctx);
  // },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PostFeedLayout: (props: types.PostFeedLayout, data: ContentCache, ctx: DebugContext) => {
    const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
    let posts = getAllNonFeaturedPostsSorted(data.objects);
    if (!process.env['stackbitPreview']) {
      posts = posts.filter(isPublished);
    }
    const paginationData = getPagedItemsForPage(props, posts, numOfPostsPerPage);
    // const items = resolveReferences(paginationData.items, ['author'], data.objects);
    return {
      ...props,
      ...paginationData,
      // items,
    };
  },
  // PostFeedCategoryLayout: (
  //   props: { __metadata: any; numOfPostsPerPage?: any },
  //   data: ContentCache
  // ) => {
  //   const categoryId = props.__metadata?.id;
  //   const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
  //   let allCategoryPosts = getAllCategoryPostsSorted(data.objects, categoryId);
  //   if (!process.env['stackbitPreview']) {
  //     allCategoryPosts = allCategoryPosts.filter(isPublished);
  //   }
  //   const paginationData = getPagedItemsForPage(props, allCategoryPosts, numOfPostsPerPage);
  //   const items = resolveReferences(paginationData.items, ['author'], data.objects);
  //   return {
  //     ...props,
  //     ...paginationData,
  //     items,
  //   };
  // },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RecentPostsSection: (data: types.RecentPostsSection, cache: ContentCache) => {
    let posts = getAllPostsSorted(cache.objects);
    if (!process.env['stackbitPreview']) {
      posts = posts.filter(isPublished);
    }
    posts = posts.slice(0, data.recentCount || 6);
    // const recentPosts = resolveReferences(posts, ['author'], data.objects);
    return {
      ...data,
      posts,
    };
  },
  // FeaturedPostsSection: (props: any, data: ContentCache, ctx: DebugContext) => {
  //   return resolveReferences(props, ['posts.author'], data.objects, ctx);
  // },
  // FeaturedPeopleSection: (props: any, data: ContentCache, ctx: DebugContext) => {
  //   return resolveReferences(props, ['people'], data.objects, ctx);
  // },
  // FormBlock: async (props: any) => {
  //   if (!props.destination) {
  //     return props;
  //   }
  //   if (!process.env['STACKBIT_CONTACT_FORM_SECRET']) {
  //     console.error(
  //       `No STACKBIT_CONTACT_FORM_SECRET provided. It will not work properly for production build.`
  //     );
  //     return props;
  //   }
  //   const secretKey = crypto
  //     .createHash('sha256')
  //     .update(process.env['STACKBIT_CONTACT_FORM_SECRET'])
  //     .digest();
  //   const destination = await new SignJWT({ email: props.destination })
  //     .setProtectedHeader({ alg: 'HS256' })
  //     .sign(secretKey);
  //   return {
  //     ...props,
  //     destination,
  //   };
  // },
};
