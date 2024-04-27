import { type Metadata } from 'next';

import {
  Blockquote,
  ContactSection,
  Container,
  FadeIn,
  List,
  ListItem,
  PageIntro,
  StylizedImage,
  TagList,
  TagListItem,
} from '@watheia/studio-ui';

import imageLaptop from '@content/images/laptop.jpg';
import imageMeeting from '@content/images/meeting.jpg';
import imageWhiteboard from '@content/images/whiteboard.jpg';

function Section({
  title,
  image,
  children,
}: {
  title: string;
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>;
  children: React.ReactNode;
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-black after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="font-display mt-2 text-3xl font-medium tracking-tight text-black sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  );
}

function Inception() {
  return (
    <Section title="Inception" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We work closely with our clients to understand their{' '}
          <strong className="font-semibold text-black">needs</strong> and goals, embedding
          ourselves in their every day operations to understand what makes their business tick.
        </p>
        <p>
          Our team of private investigators shadow the company director’s for several weeks while
          our account managers focus on going through their trash. Our senior security experts
          then perform social engineering hacks to gain access to their{' '}
          <strong className="font-semibold text-black">business</strong> accounts — handing that
          information over to our forensic accounting team.
        </p>
        <p>
          Once the full audit is complete, we report back with a comprehensive{' '}
          <strong className="font-semibold text-black">plan</strong> and, more importantly, a
          budget.
        </p>
      </div>

      <h3 className="font-display mt-12 text-base font-semibold text-black">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>In-depth questionnaires</TagListItem>
        <TagListItem>Feasibility studies</TagListItem>
        <TagListItem>Blood samples</TagListItem>
        <TagListItem>Employee surveys</TagListItem>
        <TagListItem>Proofs-of-concept</TagListItem>
        <TagListItem>Forensic audit</TagListItem>
      </TagList>
    </Section>
  );
}

function Elaboration() {
  return (
    <Section title="Elaboration" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Based off of the discovery phase, we develop a comprehensive roadmap for each product
          and start working towards delivery. The roadmap is an intricately tangled mess of
          technical nonsense designed to drag the project out as long as possible.
        </p>
        <p>
          Each client is assigned a key account manager to keep lines of communication open and
          obscure the actual progress of the project. They act as a buffer between the client’s
          incessant nagging and the development team who are hard at work scouring open source
          projects for code to re-purpose.
        </p>
        <p>
          Our account managers are trained to only reply to client emails after 9pm, several days
          after the initial email. This reinforces the general aura that we are very busy and
          dissuades clients from asking for changes.
        </p>
      </div>

      {/* <Blockquote author={{ name: 'Debra Fiscal', role: 'CEO of Auto-DevOps' }} className="mt-12">
        Watheia Labs were so regular with their progress updates we almost began to think they
        were automated!
      </Blockquote> */}
    </Section>
  );
}

function Construction() {
  return (
    <Section title="Construction" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Based off of the discovery phase, we develop a comprehensive roadmap for each product
          and start working towards delivery. The roadmap is an intricately tangled mess of
          technical nonsense designed to drag the project out as long as possible.
        </p>
        <p>
          Each client is assigned a key account manager to keep lines of communication open and
          obscure the actual progress of the project. They act as a buffer between the client’s
          incessant nagging and the development team who are hard at work scouring open source
          projects for code to re-purpose.
        </p>
        <p>
          Our account managers are trained to only reply to client emails after 9pm, several days
          after the initial email. This reinforces the general aura that we are very busy and
          dissuades clients from asking for changes.
        </p>
      </div>

      <Blockquote author={{ name: 'Debra Fiscal', role: 'CEO of Auto-DevOps' }} className="mt-12">
        Watheia Labs were so regular with their progress updates we almost began to think they
        were automated!
      </Blockquote>
    </Section>
  );
}

function Transition() {
  return (
    <Section title="Transition" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          About halfway through the Build phase, we push each project out by 6 weeks due to a
          change in <strong className="font-semibold text-black">requirements</strong>. This
          allows us to increase the budget a final time before launch.
        </p>
        <p>
          Despite largely using pre-built components, most of the{' '}
          <strong className="font-semibold text-black">progress</strong> on each project takes
          place in the final 24 hours. The development time allocated to each client is actually
          spent making augmented reality demos that go viral on Twitter.
        </p>
        <p>
          We ensure that the main pages of the site are{' '}
          <strong className="font-semibold text-black">fully functional</strong> at launch — the
          auxiliary pages will, of course, be lorem ipusm shells which get updated as part of our
          exorbitant <strong className="font-semibold text-black">maintenance</strong> retainer.
        </p>
      </div>

      <h3 className="font-display mt-12 text-base font-semibold text-black">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          Our projects always have 100% test coverage, which would be impressive if our tests
          weren’t as porous as a sieve.
        </ListItem>
        <ListItem title="Infrastructure">
          To ensure reliability we only use the best Digital Ocean droplets that $4 a month can
          buy.
        </ListItem>
        <ListItem title="Support">
          Because we hold the API keys for every critical service your business uses, you can
          expect a lifetime of support, and invoices, from us.
        </ListItem>
      </List>
    </Section>
  );
}

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
};

export default function Process() {
  return (
    <>
      <PageIntro
        eyebrow="Our process"
        title="A modern approach to Rational Unified Process (RUP)"
      >
        <p>
          By combining flexibility, quality focus, and comprehensive guidance, RUP provides a
          structured yet adaptable approach to engineering that can lead to more successful and
          efficient software development outcomes.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Inception />
        <Elaboration />
        <Construction />
        <Transition />
      </div>

      <ContactSection />
    </>
  );
}
