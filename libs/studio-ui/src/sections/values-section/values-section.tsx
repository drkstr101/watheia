import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';
import { Container, GridList, GridListItem, GridPattern, SectionIntro } from '../../components';

export type ValuesSectionProps = HtmlHTMLAttributes<HTMLDivElement>;

export default function ValuesSection({ className, ...props }: ValuesSectionProps) {
  return (
    <div
      className={clsx('relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40', className)}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-white">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-black/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro eyebrow="How we work" title="Balancing reliability and innovation">
        <p>
          By striking a harmonious balance between reliability and innovation, we can offer our
          clients the stability of proven solutions while continuously pushing boundaries to
          uncover new possibilities and drive sustainable growth.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Meticulous">
            The first part of any partnership is getting our designer to put your logo in our
            template. The second step is getting them to do the colors.
          </GridListItem>
          <GridListItem title="Efficient">
            We pride ourselves on never missing a deadline which is easy because most of the work
            was done years ago.
          </GridListItem>
          <GridListItem title="Adaptable">
            Every business has unique needs and our greatest challenge is shoe-horning those needs
            into something we already built.
          </GridListItem>
          <GridListItem title="Honest">
            We are transparent about all of our processes, banking on the simple fact our clients
            never actually read anything.
          </GridListItem>
          <GridListItem title="Loyal">
            We foster long-term relationships with our clients that go beyond just delivering a
            product, allowing us to invoice them for decades.
          </GridListItem>
          <GridListItem title="Innovative">
            The technological landscape is always evolving and so are we. We are constantly on the
            lookout for new open source projects to clone.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
}
