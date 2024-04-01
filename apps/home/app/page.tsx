import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  ContactSection,
  Container,
  FadeIn,
  FadeInStagger,
  List,
  ListItem,
  SectionIntro,
  StylizedImage,
  TestimonialSection,
} from '@watheia/studio-ui';

import logoUnseal from '@assets/images/clients/auto-devops/logo-light.svg';
import logoBrightPath from '@assets/images/clients/bright-path/logo-light.svg';
import logoFamilyFund from '@assets/images/clients/cabbage-cms/logo-light.svg';
import logoGreenLife from '@assets/images/clients/green-life/logo-light.svg';
import logoHomeWork from '@assets/images/clients/home-work/logo-light.svg';
import logoMailSmirk from '@assets/images/clients/mail-smirk/logo-light.svg';
import logoPhobiaDark from '@assets/images/clients/natural/logo-dark.svg';
import logoPhobiaLight from '@assets/images/clients/natural/logo-light.svg';
import logoNorthAdventures from '@assets/images/clients/north-adventures/logo-light.svg';
import imageLaptop from '@assets/images/laptop.jpg';

import { CaseStudy, MDXEntry, loadCaseStudies } from '../lib/mdx';

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
    <div className="mt-24 rounded-4xl bg-black py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
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
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We&apos;re dedicated to empowering businesses with cutting-edge solutions that drive
          efficiency, sustainability, and growth. From AI-driven automation to sustainable tech
          initiatives, we pave the way for a more prosperous and sustainable future for all.
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
                      alt={caseStudy.client}
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
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-black">
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
            <ListItem title="Web development">
              Transform your online presence with our top-tier web development services. Our
              skilled team crafts visually stunning and fully functional websites tailored to your
              brand&apos;s identity, ensuring a seamless user experience across all devices.
              Partner with us to create a captivating digital platform that captivates your
              audience and drives business growth.
            </ListItem>
            <ListItem title="Application development">
              Elevate your digital strategy with our comprehensive software development solutions.
              From concept to execution, our expert team delivers cutting-edge software tailored
              to your business needs, ensuring seamless integration and optimal performance.
              Partner with us to turn your vision into reality and stay ahead in today&apos;s
              fast-paced market.
            </ListItem>
            <ListItem title="Digital design">
              Leverage your brand&amp;s visual identity with our premium digital design services.
              Our talented team combines creativity with strategic thinking to deliver stunning
              designs that resonate with your audience and drive engagement. Partner with us to
              bring your brand to life and leave a lasting impression in the digital world.
            </ListItem>
            <ListItem title="Project management">
              Empower your projects with our expert project management services. Our seasoned
              professionals leverage industry-leading methodologies and tools to streamline
              workflows, optimize resources, and ensure timely delivery of results. Partner with
              us to navigate complexities, mitigate risks, and achieve your business objectives
              with confidence.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
}

export const metadata: Metadata = {
  description: 'Turn your ideas into reality with custom software by Watheia Labs',
};

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3);

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-black [text-wrap:balance] sm:text-7xl">
            Turn your ideas into reality with custom software solutions
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Whether you&apos;re a startup looking to disrupt the market or an established
            enterprise aiming for digital transformation, we&apos;re here to partner with you
            every step of the way, ensuring your success in the fast-paced world of technology.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <TestimonialSection
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Natural', logo: logoPhobiaDark }}
      >
        The team at Watheia Labs went above and beyond with our onboarding, even finding a way to
        access the user’s microphone without triggering one of those annoying permission dialogs.
      </TestimonialSection>

      <Services />

      <ContactSection />
    </>
  );
}
