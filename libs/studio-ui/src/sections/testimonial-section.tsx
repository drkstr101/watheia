import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';

import { HtmlHTMLAttributes } from 'react';
import { Container } from '../components/Container';
import { FadeIn } from '../components/FadeIn';

export type TestimonialSectionProps = HtmlHTMLAttributes<HTMLDivElement> & {
  client: {
    logo?: ImageProps['src'];
    name: string;
  };
};

export function TestimonialSection({ children, client, className }: TestimonialSectionProps) {
  return (
    <div className={clsx('relative isolate bg-white py-16 sm:py-28 md:py-32', className)}>
      {/* <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-black/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      /> */}
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-black sm:text-4xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              {client.logo ? (
                <Image src={client.logo} alt={client.name} unoptimized />
              ) : (
                client.name
              )}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  );
}

export default TestimonialSection;
