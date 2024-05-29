import Image from 'next/image';
import Link from 'next/link';

import logoUnseal from '../../assets/images/clients/auto-devops/logo-light.svg';
import logoBrightPath from '../../assets/images/clients/bright-path/logo-light.svg';
import logoFamilyFund from '../../assets/images/clients/cabbage-cms/logo-light.svg';
import logoPhobiaLight from '../../assets/images/clients/cabbage-ui/logo-light.svg';
import logoGreenLife from '../../assets/images/clients/green-life/logo-light.svg';
import logoHomeWork from '../../assets/images/clients/home-work/logo-light.svg';
import logoMailSmirk from '../../assets/images/clients/mail-smirk/logo-light.svg';
import logoNorthAdventures from '../../assets/images/clients/north-adventures/logo-light.svg';
import imageLaptop from '../../assets/images/laptop.jpg';

import {
  ContactSection,
  Container,
  FadeIn,
  FadeInStagger,
  List,
  ListItem,
  SectionIntro,
  StylizedImage,
} from '../../components';
import { CaseStudy, MDXEntry } from '../../studio-ui.types';

const clients = [
  ['Natural', logoPhobiaLight],
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
    <div className="rounded-4xl mt-24 bg-black py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left">
            Loved by clients and partners world wide
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul role="list" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
}

function CaseStudies({ caseStudies }: { caseStudies: Array<MDXEntry<CaseStudy>> }) {
  return (
    <>
      <SectionIntro
        eyebrow="Solutions"
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We&apos;re dedicated to empowering businesses with cutting-edge solutions that drive
          efficiency, sustainability, and growth. Our featured case-studies, example projects, and
          tech demos
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.slug} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-black/5 transition hover:bg-white sm:p-8">
                <h3>
                  <Link href={caseStudy.slug}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.project}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-black">
                  <time dateTime={caseStudy.date.split('-')[0]} className="font-semibold">
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>{caseStudy.project}</span>
                </p>
                <p className="font-display mt-6 text-2xl font-semibold text-black">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">{caseStudy.description}</p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  );
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We help you identify, explore and respond to new opportunities."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          With our strategic guidance and tailored solutions, we empower your business to seize
          untapped potential and thrive in ever-evolving markets.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Project Management">
              Our seasoned professionals leverage industry-leading methodologies and tools to
              streamline workflows, optimize resources, and ensure timely delivery of results.
              Partner with us to navigate complexities, mitigate risks, and achieve your business
              objectives with confidence.
            </ListItem>
            <ListItem title="Systems Architecture & Design">
              Omnis ut laboriosam. Unde corrupti eos deleniti itaque porro eum qui. Quis commodi
              veniam. Voluptas ullam exercitationem ut quae numquam voluptatem sed tempora qui. Et
              et ipsum saepe.
            </ListItem>
            <ListItem title="Software Development">
              From concept to execution, our expert team delivers cutting-edge software tailored
              to your business needs, ensuring seamless integration and optimal performance.
              Partner with us to turn your vision into reality and stay ahead in today&apos;s
              fast-paced market.
            </ListItem>
            <ListItem title="Education &amp; Training">
              Mollitia non similique quo eos explicabo labore et assumenda qui. Excepturi eum aut
              praesentium aliquid eos. Molestiae qui consequatur qui ut delectus veritatis ratione
              qui commodi. Dolores qui sunt sit.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
}

/* eslint-disable-next-line */
export interface HomeViewProps {
  caseStudies: MDXEntry<CaseStudy>[];
}

export function HomeView({ caseStudies }: HomeViewProps) {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-black [text-wrap:balance] sm:text-7xl">
            Create better software with{' '}
            <span className="text-primary-600 relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="fill-accent-500/40 absolute left-0 top-2/3 h-[0.58em] w-full"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Watheia Labs</span>
            </span>
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Whether you&apos;re a startup looking to disrupt the market or an established
            enterprise aiming for digital transformation, we&apos;re here to partner with you
            every step of the way, ensuring your success in the fast-paced world of technology.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <Services />

      <CaseStudies caseStudies={caseStudies} />

      {/* <TestimonialSection
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Natural', logo: logoPhobiaDark }}
      >
        The team at Watheia Labs went above and beyond with our onboarding, even finding a way to
        access the user’s microphone without triggering one of those annoying permission dialogs.
      </TestimonialSection> */}

      <ContactSection />
    </>
  );
}

export default HomeView;
