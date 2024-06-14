export function seoGenerateMetaTags(page: any, site: any) {
  let pageMetaTags: Record<string, any> = {};

  if (site.defaultMetaTags?.length) {
    site.defaultMetaTags.forEach((metaTag: any) => {
      pageMetaTags[metaTag.property] = metaTag.content;
    });
  }

  pageMetaTags = {
    ...pageMetaTags,
    ...(seoGenerateTitle(page, site) && { 'og:title': seoGenerateTitle(page, site) }),
    ...(seoGenerateOgImage(page, site) && { 'og:image': seoGenerateOgImage(page, site) }),
  };

  if (page.metaTags?.length) {
    page.metaTags.forEach((metaTag: any) => {
      pageMetaTags[metaTag.property] = metaTag.content;
    });
  }

  const metaTags: any[] = [];
  Object.keys(pageMetaTags).forEach((key) => {
    if (pageMetaTags[key] !== null) {
      metaTags.push({
        property: key,
        content: pageMetaTags[key],
        format: key.startsWith('og') ? 'property' : 'name',
      });
    }
  });

  return metaTags;
}

export function seoGenerateTitle(page: any, site: any) {
  let title = page.metaTitle ? page.metaTitle : page.title;
  if (site.titleSuffix && page.addTitleSuffix !== false) {
    title = `${title} - ${site.titleSuffix}`;
  }
  return title;
}

export function seoGenerateMetaDescription(page: any, site: any) {
  let metaDescription = null;
  // Blog posts use the exceprt as the default meta description
  if (page.__metadata.modelName === 'PostLayout') {
    metaDescription = page.excerpt;
  }
  // page metaDescription field overrides all others
  if (page.metaDescription) {
    metaDescription = page.metaDescription;
  }
  return metaDescription;
}

export function seoGenerateOgImage(page: any, site: any) {
  let ogImage = null;
  // Use the sites default og:image field
  if (site.defaultSocialImage) {
    ogImage = site.defaultSocialImage;
  }
  // Blog posts use the featuredImage as the default og:image
  if (page.__metadata.modelName === 'PostLayout') {
    if (page.featuredImage?.url) {
      ogImage = page.featuredImage.url;
    }
  }
  // page socialImage field overrides all others
  if (page.socialImage) {
    ogImage = page.socialImage;
  }

  // Relative or absolute URL
  const absoluteUrlRegex = new RegExp('^(?:[a-z+]+:)?//', 'i');

  // ogImage should use an absolute URL. Get the Netlify domain URL from the Netlify environment variable process.env.URL
  const domainUrl = site.env?.URL;

  if (ogImage) {
    if (domainUrl && !absoluteUrlRegex.test(ogImage)) {
      return domainUrl + ogImage;
    } else {
      return ogImage;
    }
  }
  return null;
}
