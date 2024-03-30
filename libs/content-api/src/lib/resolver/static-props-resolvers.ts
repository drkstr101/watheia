import {
  getAllNonFeaturedPostsSorted,
  getAllPostsSorted,
  getPagedItemsForPage,
  getRootPagePath,
  isPublished,
  mapDeepAsync,
} from '@watheia/content-helpers';
import crypto from 'crypto';
import { SignJWT } from 'jose/jwt/sign';
import { ContentCache, DebugContext } from '../content-api.types';
import { resolveReferences } from './resolver-utils';

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
  Article: (props: any, data: ContentCache, ctx: DebugContext) => {
    return resolveReferences(props, ['author'], data.objects, ctx);
  },
  PostFeedLayout: (props: any, data: ContentCache) => {
    const numOfPostsPerPage = props.numOfPostsPerPage ?? 10;
    let allPosts = getAllNonFeaturedPostsSorted(data.objects);
    if (!process.env['stackbitPreview']) {
      allPosts = allPosts.filter(isPublished);
    }
    const paginationData = getPagedItemsForPage(props, allPosts, numOfPostsPerPage);
    const items = resolveReferences(paginationData.items, ['author'], data.objects);
    return {
      ...props,
      ...paginationData,
      items,
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
  RecentPostsSection: (props: any, data: ContentCache) => {
    let allPosts = getAllPostsSorted(data.objects);
    if (!process.env['stackbitPreview']) {
      allPosts = allPosts.filter(isPublished);
    }
    allPosts = allPosts.slice(0, props.recentCount || 6);
    const recentPosts = resolveReferences(allPosts, ['author'], data.objects);
    return {
      ...props,
      posts: recentPosts,
    };
  },
  FeaturedPostsSection: (props: any, data: ContentCache, ctx: DebugContext) => {
    return resolveReferences(props, ['posts.author'], data.objects, ctx);
  },
  FeaturedPeopleSection: (props: any, data: ContentCache, ctx: DebugContext) => {
    return resolveReferences(props, ['people'], data.objects, ctx);
  },
  FormBlock: async (props: any) => {
    if (!props.destination) {
      return props;
    }
    if (!process.env['STACKBIT_CONTACT_FORM_SECRET']) {
      console.error(
        `No STACKBIT_CONTACT_FORM_SECRET provided. It will not work properly for production build.`
      );
      return props;
    }
    const secretKey = crypto
      .createHash('sha256')
      .update(process.env['STACKBIT_CONTACT_FORM_SECRET'])
      .digest();
    const destination = await new SignJWT({ email: props.destination })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secretKey);
    return {
      ...props,
      destination,
    };
  },
};
