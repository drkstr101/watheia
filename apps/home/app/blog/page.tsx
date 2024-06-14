import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@watheia/content-helpers';
import { Border, Button, ContactSection, Container, FadeIn, PageIntro } from '@watheia/base-ui';

import { loadArticles } from '../../lib/mdx';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
};

export default async function Blog() {
  const articles = await loadArticles();

  return (
    <>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Stay up-to-date with the latest industry news as our marketing teams finds new ways to
          re-purpose old CSS tricks articles.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {articles.map((article) => (
            <FadeIn key={article.slug}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-black">
                        <Link href={article.slug}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-black lg:static">
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                            <Image
                              alt=""
                              {...article.author.image}
                              className="h-12 w-12 object-cover grayscale"
                            />
                          </div>
                          <div className="text-sm text-black">
                            <div className="font-semibold">{article.author.name}</div>
                            <div>{article.author.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <Button
                        href={article.slug}
                        aria-label={`Read more: ${article.title}`}
                        className="mt-8"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  );
}
