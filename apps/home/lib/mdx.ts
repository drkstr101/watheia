import glob from 'fast-glob';
import { type ImageProps } from 'next/image';

const WORKSPACE_ROOT = process.env['WORKSPACE_ROOT'] ?? process.cwd();

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string
): Promise<Array<MDXEntry<T>>> {
  return (
    await Promise.all(
      (
        await glob('**/page.mdx', { cwd: `${WORKSPACE_ROOT}/apps/home/app/${directory}` })
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

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string };

export type MDXEntry<T> = T & { slug: string; metadata: T };

export interface Article {
  date: string;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
    image: ImagePropsWithOptionalAlt;
  };
}

export interface CaseStudy {
  date: string;
  project: string;
  title: string;
  description: string;
  summary: Array<string>;
  logo: ImageProps['src'];
  image: ImagePropsWithOptionalAlt;
  service: string;
  testimonial: {
    author: {
      name: string;
      role: string;
    };
    content: string;
  };
}

export function loadArticles() {
  return loadEntries<Article>('blog', 'article');
}

export function loadCaseStudies() {
  return loadEntries<CaseStudy>('solutions', 'caseStudy');
}
