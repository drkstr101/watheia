import { config } from '@watheia/content-helpers';
import { Article, CaseStudy, MDXEntry } from '@watheia/studio-ui';
import glob from 'fast-glob';

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string
): Promise<Array<MDXEntry<T>>> {
  return (
    await Promise.all(
      (
        await glob('**/page.mdx', { cwd: `${config.workspaceRoot}/apps/home/app/${directory}` })
      ).map(async (filename: string) => {
        const metadata = (await import(`../app/${directory}/${filename}`))[metaName] as T;
        return {
          ...metadata,
          metadata,
          slug: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
        };
      })
    )
  ).sort((a, b) => b.date.localeCompare(a.date));
}

export function loadArticles() {
  return loadEntries<Article>('blog', 'article');
}

export function loadCaseStudies() {
  return loadEntries<CaseStudy>('solutions', 'caseStudy');
}
