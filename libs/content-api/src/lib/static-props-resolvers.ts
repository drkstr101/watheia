import { deepMapObject } from '@watheia/content-helpers';
import { GlobalProps, PageComponentProps, models, types } from '@watheia/content-model';

export function resolveStaticProps(
  urlPath: string,
  allData: types.ContentObject[]
): PageComponentProps {
  const originalPage = allData.find((obj) => obj.__metadata.urlPath === urlPath);
  const globalProps: GlobalProps = {
    site: allData.find(
      (obj) => obj.__metadata.modelName === models.ConfigModel.name
    ) as types.Config,
  };

  function enrichContent(value: any) {
    const type = value?.__metadata?.modelName;
    if (type && PropsResolvers[type]) {
      const resolver = PropsResolvers[type];
      return resolver(value, allData);
    } else {
      return value;
    }
  }

  const enrichedPage = deepMapObject(originalPage, enrichContent) as types.ContentObject;
  return {
    ...enrichedPage,
    global: globalProps,
  };
}

type ResolverFunction = (
  props: types.ContentObject,
  allData: types.ContentObject[]
) => types.ContentObject;

const PropsResolvers: Partial<Record<types.ContentObjectType, ResolverFunction>> = {
  PostFeedLayout: (props, allData) => {
    const allPosts = getAllPostsSorted(allData);
    return {
      ...(props as types.PostFeedLayout),
      items: allPosts,
    };
  },
  RecentPostsSection: (props, allData) => {
    const recentPosts = getAllPostsSorted(allData).slice(
      0,
      (props as types.RecentPostsSection).recentCount || 3
    );
    return {
      ...props,
      posts: recentPosts,
    };
  },
  ProjectLayout: (props, allData) => {
    const allProjects = getAllProjectsSorted(allData);
    const currentProjectId = props.__metadata?.id;
    const currentProjectIndex = allProjects.findIndex(
      (project) => project.__metadata?.id === currentProjectId
    );
    const nextProject = currentProjectIndex > 0 ? allProjects[currentProjectIndex - 1] : null;
    const prevProject =
      currentProjectIndex < allProjects.length - 1 ? allProjects[currentProjectIndex + 1] : null;
    return {
      ...props,
      prevProject,
      nextProject,
    };
  },
  ProjectFeedLayout: (props, allData) => {
    const allProjects = getAllProjectsSorted(allData);
    return {
      ...(props as types.ProjectFeedLayout),
      items: allProjects,
    };
  },
  RecentProjectsSection: (props, allData) => {
    const recentProjects = getAllProjectsSorted(allData).slice(
      0,
      (props as types.RecentProjectsSection).recentCount || 3
    );
    return {
      ...props,
      projects: recentProjects,
    };
  },
};

function getAllPostsSorted(objects: types.ContentObject[]) {
  const all = objects.filter(
    (object) => object.__metadata?.modelName === 'PostLayout'
  ) as types.PostLayout[];
  const sorted = all.sort(
    (postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime()
  );
  return sorted;
}

function getAllProjectsSorted(objects: types.ContentObject[]) {
  const all = objects.filter(
    (object) => object.__metadata?.modelName === 'ProjectLayout'
  ) as types.ProjectLayout[];
  const sorted = all.sort(
    (projectA, projectB) => new Date(projectB.date).getTime() - new Date(projectA.date).getTime()
  );
  return sorted;
}
