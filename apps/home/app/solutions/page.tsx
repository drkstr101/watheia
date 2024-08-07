import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  Blockquote,
  Border,
  Button,
  ContactSection,
  Container,
  FadeIn,
  FadeInStagger,
  PageIntro,
  TestimonialSection,
} from '@watheia/base-ui';
import { formatDate } from '@watheia/content-helpers';

import logoUnseal from '@images/clients/auto-devops/logo-dark.svg';
import logoBrightPath from '@images/clients/bright-path/logo-dark.svg';
import logoFamilyFund from '@images/clients/cabbage-cms/logo-dark.svg';
import logoPhobia from '@images/clients/cabbage-ui/logo-dark.svg';
import logoGreenLife from '@images/clients/green-life/logo-dark.svg';
import logoHomeWork from '@images/clients/home-work/logo-dark.svg';
import logoMailSmirk from '@images/clients/mail-smirk/logo-dark.svg';
import logoNorthAdventures from '@images/clients/north-adventures/logo-dark.svg';
import { CaseStudy, MDXEntry, loadCaseStudies } from '../../lib/mdx';

function CaseStudies({ caseStudies }: { caseStudies: Array<MDXEntry<CaseStudy>> }) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-black">Featured projects</h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.project}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="h-16 w-16 flex-none"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-black sm:mt-0 lg:mt-8">
                      {caseStudy.project}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-black after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                    <p className="text-sm text-black lg:mt-2">
                      <time dateTime={caseStudy.date}>{formatDate(caseStudy.date)}</time>
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-black">
                    <Link href={caseStudy.slug}>{caseStudy.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={caseStudy.slug}
                      aria-label={`Read case study: ${caseStudy.project}`}
                    >
                      Read case study
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote author={caseStudy.testimonial.author} className="mt-12">
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  );
}

const clients = [
  ['Natural', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Auto-DevOps', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
];

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-black">You’re in good company</h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([project, logo]) => (
            <li key={project} className="group">
              <FadeIn className="overflow-hidden">
                <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                  <Image src={logo} alt={project} unoptimized />
                </Border>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  );
}

export const metadata: Metadata = {
  title: 'From the lab',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
};

export default async function Work() {
  const caseStudies = await loadCaseStudies();

  return (
    <>
      <PageIntro
        eyebrow="Case Studies &amp; Demos"
        title="Proven solutions for real-world problems."
      >
        <p>
          We believe in efficiency and maximizing our resources to provide the best value to our
          clients. The primary way we do that is by re-using the same five projects we’ve been
          developing for the past decade.
        </p>
      </PageIntro>

      <CaseStudies caseStudies={caseStudies} />

      <TestimonialSection
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
      >
        We approached <em>Watheia Labs</em> because we loved their past work. They delivered
        something remarkably similar in record time.
      </TestimonialSection>

      <Clients />

      <ContactSection />
    </>
  );
}
