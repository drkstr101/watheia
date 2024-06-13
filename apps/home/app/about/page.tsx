import { type Metadata } from 'next';
import Image from 'next/image';

import imageDriesVincent from '@assets/images/team/dries-vincent.jpg';
import imageLeslieAlexander from '@assets/images/team/leslie-alexander.jpg';
import imageMichaelFoster from '@assets/images/team/michael-foster.jpg';

import {
  Border,
  ContactSection,
  Container,
  FadeIn,
  FadeInStagger,
  GridList,
  GridListItem,
  PageIntro,
  PageLinks,
  SectionIntro,
  StatList,
  StatListItem,
  ValuesSection,
} from '@watheia/base-ui';
import { loadArticles } from '../../lib/mdx';

function Culture() {
  return (
    <div className="rounded-4xl mt-24 bg-black py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our values"
        title="Our core values guide our approach to every project."
        invert
      >
        <p>
          We prioritize transparent communication, foster strong relationships built on trust, and
          demonstrate unwavering commitment to delivering exceptional client results.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Honesty" invert>
            We believe in providing candid feedback, even when it may be difficult, to ensure that
            our clients receive the most accurate and reliable guidance possible.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We earn trust through consistent reliability, integrity, and competence. By delivering
            on our promises and consistently exceeding expectations, we strive to cultivate trust
            with our clients
          </GridListItem>
          <GridListItem title="Dedication" invert>
            We are committed to delivering results that not only meet but surpass expectations,
            adding tangible value to our clients&apos; businesses.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Patricia A Scott',
        role: 'Co-Founder / CFO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Aaron R Miller',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Patrick S Stevenson',
        role: 'Co-Founder / COO',
        image: { src: imageDriesVincent },
      },
    ],
  },
  // {
  //   title: 'Team',
  //   people: [
  //     {
  //       name: 'Chelsea Hagon',
  //       role: 'Senior Developer',
  //       image: { src: imageChelseaHagon },
  //     },
  //     {
  //       name: 'Emma Dorsey',
  //       role: 'Senior Designer',
  //       image: { src: imageEmmaDorsey },
  //     },
  //     {
  //       name: 'Leonard Krasner',
  //       role: 'VP, User Experience',
  //       image: { src: imageLeonardKrasner },
  //     },
  //     {
  //       name: 'Blake Reid',
  //       role: 'Junior Copywriter',
  //       image: { src: imageBlakeReid },
  //     },
  //     {
  //       name: 'Kathryn Murphy',
  //       role: 'VP, Human Resources',
  //       image: { src: imageKathrynMurphy },
  //     },
  //     {
  //       name: 'Whitney Francis',
  //       role: 'Content Specialist',
  //       image: { src: imageWhitneyFrancis },
  //     },
  //     {
  //       name: 'Jeffrey Webb',
  //       role: 'Account Coordinator',
  //       image: { src: imageJeffreyWebb },
  //     },
  //     {
  //       name: 'Benjamin Russel',
  //       role: 'Senior Developer',
  //       image: { src: imageBenjaminRussel },
  //     },
  //     {
  //       name: 'Angela Fisher',
  //       role: 'Front-end Developer',
  //       image: { src: imageAngelaFisher },
  //     },
  //   ],
  // },
];

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-black">{group.title}</h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">{person.role}</p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  );
}

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
};

export default async function About() {
  const blogArticles = (await loadArticles()).slice(0, 2);

  return (
    <>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
          We believe that our strength lies in our collaborative approach, which puts our clients
          at the center of everything we do.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            By fostering open communication and active participation, we ensure that our
            clients&apos; visions are not only heard but also fully realized. We view each project
            as a partnership, working closely with our clients to understand their unique goals,
            challenges, and requirements.
          </p>
          <p>
            This collaborative ethos permeates every aspect of our work, from initial ideation to
            final implementation and beyond. We leverage our collective expertise and diverse
            perspectives to develop innovative solutions that drive tangible results for our
            clients. By working hand in hand with our clients every step of the way, we cultivate
            trust, transparency, and mutual respect, laying the foundation for successful
            long-term partnerships. Together, we can achieve extraordinary outcomes and propel
            your business towards continued growth and success.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container>

      <Culture />

      <ValuesSection />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide."
        pages={blogArticles}
      />

      <ContactSection />
    </>
  );
}
