import { type ImageProps } from 'next/image';

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
