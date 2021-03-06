import React from 'react';
import clsx from 'clsx';

import styles from './community-section.module.scss';

import { Paragraph } from '../../base-ui.elements/paragraph';
import { Grid } from '../../base-ui.layout/grid-component';
import { alignItems, marginCenter } from '../../base-ui.layout/align';
import { textColumn } from '../../base-ui.layout/page-frame';
import { PossibleSizes } from '../../base-ui.theme/sizes';

import { GithubLink } from '../../waweb.marketing/community-links/github-link';
import { links } from '../../waweb.content/links';
import { SlackLink } from '../../waweb.marketing/community-links/slack-link';
import { H2 } from '../../waweb.elements/heading';
import { TwitterLink } from '../../waweb.marketing/community-links/twitter-link';
import { TwitterCard } from '../../waweb.marketing/twitter-card';

export type CommunitySectionProps = {
  /**
   * Show Github star count next to the Repository link.
   */
  githubStars?: number;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * @name CommunitySection
 * @description
 * A section providing links to various bit communities, such as Twitter, Slack and Github.
 * Assumes the consuming component to supply className with width and other styles.
 */

export function CommunitySection(props: CommunitySectionProps) {
  const { githubStars, ...rest } = props;

  return (
    <Grid
      {...rest}
      colL={2}
      className={clsx(props.className, styles['communitySection'], alignItems.center)}
      data-bit-id="waweb.sections/community"
    >
      <div className={styles['cta']}>
        <div className={clsx(textColumn, marginCenter)}>
          <H2 className={styles['title']} size={PossibleSizes.sm}>
            Join the community
          </H2>
          <Paragraph className={styles['text']} size={PossibleSizes.md}>
            Join over 200,000 developers around the world to share and build components
            together. Enjoy the world’s largest open-source component community with over 60,000
            components and growing. Come join us.
          </Paragraph>

          <div className={styles['links']}>
            <GithubLink href={links.github} starCount={githubStars} />
            <SlackLink href={links.slack} />
            <TwitterLink href={links.twitter} />
          </div>
        </div>
      </div>

      <div className={styles['tweets']}>
        <TwitterCard
          className={styles['tweet']}
          title="@Sketch2R"
          image={'homepage-bit/tweets/sketch2r.jpg'}
          verified
          titleId="twitterTitle0"
          textId="twitterText0"
        >
          Great news! We just published our first Stratos components to http://bit.dev!
        </TwitterCard>
        <TwitterCard
          className={styles['tweet']}
          title="@TheNextWeb"
          image={'homepage/join-fold/tnw.png'}
          verified
          titleId="twitterTitle0"
          textId="twitterText0"
        >
          Build software like Lego with this smart new developer tool.
        </TwitterCard>
        <TwitterCard
          className={styles['tweet']}
          title="@smashingmag"
          image={'homepage/join-fold/smashing.png'}
          verified
          titleId="twitterTitle1"
          textId="twitterText2"
        >
          Watheia Labs, a distributed virtual component repository for projects built in a
          modular way.
        </TwitterCard>
      </div>
    </Grid>
  );
}
