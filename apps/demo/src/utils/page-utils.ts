export function cssClassesFromUrlPath(urlPath: string) {
  const parts = urlPath
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean);

  let css = 'page';
  return parts.map((part) => {
    css += `-${part}`;
    return css;
  });
}

export function getPageUrl(page: { slug: string; __metadata: { modelName: string } }) {
  if (!page || !page.slug) {
    return null;
  }

  if (['Article'].includes(page?.__metadata.modelName)) {
    return `/blog${page.slug.startsWith('/') ? page.slug : `/${page.slug}`}`;
  }

  return page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
}

export function setEnvironmentVariables() {
  return {
    ...(process?.env?.URL && { URL: process.env.URL }),
  };
}
