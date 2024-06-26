import clsx from 'clsx';
import Link from 'next/link';

import { formatDate } from '@watheia/content-helpers';

import { Border } from './Border';
import { Container } from './Container';
import { FadeIn, FadeInStagger } from './FadeIn';
import { GridPattern } from './GridPattern';
import { SectionIntro } from './SectionIntro';

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M24 3 18 .5v2H0v1h18v2L24 3Z" />
    </svg>
  );
}

interface Page {
  slug: string;
  date: string;
  title: string;
  description: string;
}

function PageLink({ page }: { page: Page }) {
  return (
    <article key={page.slug}>
      <Border position="left" className="relative flex flex-col items-start pl-8">
        <h3 className="mt-6 text-base font-semibold text-black">{page.title}</h3>
        <time dateTime={page.date} className="order-first text-sm text-neutral-600">
          {formatDate(page.date)}
        </time>
        <p className="mt-2.5 text-base text-neutral-600">{page.description}</p>
        <Link
          href={page.slug}
          className="mt-6 flex gap-x-3 text-base font-semibold text-black transition hover:text-neutral-700"
          aria-label={`Read more: ${page.title}`}
        >
          Read more
          <ArrowIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  );
}

export function PageLinks({
  title,
  pages,
  intro,
  className,
}: {
  title: string;
  pages: Array<Page>;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={clsx('relative pt-24 sm:pt-32 lg:pt-40', className)}>
      <div className="rounded-t-4xl absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden bg-gradient-to-b from-white">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-black/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p>{intro}</p>}
      </SectionIntro>

      <Container className={intro ? 'mt-24' : 'mt-16'}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {pages.map((page) => (
            <FadeIn key={page.slug}>
              <PageLink page={page} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
