import React, { HTMLAttributes } from 'react';
import classNames from 'clsx';

import { PossibleSizes } from '../../../base-ui.theme/sizes';
import { mutedText } from '../../../base-ui.text/muted-text';

import { H2, H3 } from '../../../waweb.elements/heading';
import { Image } from '../../../waweb.elements/image';

import styles from './reliability.module.scss';
import { marginCenter, text } from '../../../base-ui.layout/align';
import { Link } from '../../../waweb.elements/link';
import { Paragraph } from '../../../base-ui.elements/paragraph';

/**
 * A section showing a security details for the Watheia Labs Enterprise solution.
 * The section features a large out-of-section background image, which get nicely cut in response to screen resolution.
 * @name Reliability
 */
export const Reliability = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles['corpoBg']} {...rest}>
    <div
      className={classNames(className, text.center, text.md.left)}
      data-bit-id="waweb.sections/enterprise-offering/reliability"
    >
      <div className={styles['content']}>
        <H2 size={PossibleSizes.sm} className={styles['title']}>
          Reliable and secure
        </H2>

        <AdvantageList />
      </div>
      <div>
        <Image
          src="enterprise-offering-v1/4-secured-section/sphere-enterprise.png"
          alt="corporosphere"
          className={classNames(styles['corposphere'], marginCenter)}
        />
      </div>
    </div>
  </div>
);

const AdvantageList = () => (
  <ul className={styles['bulletList']}>
    <li>
      <Image
        src="enterprise-offering-v1/4-secured-section/design.svg"
        alt="designed"
        className={styles['bullet']}
      />
      <div>
        <H3 size={PossibleSizes.xs}>Reliable by design</H3>
        <Paragraph className={mutedText} size={PossibleSizes.lg}>
          Build with auto-scaling resources that never block you, while ensuring impeccable
          availability with a Google-grade multi-zone architecture.
        </Paragraph>
      </div>
    </li>
    <li>
      <Image
        src="enterprise-offering-v1/4-secured-section/shield.svg"
        alt="shield"
        className={styles['bullet']}
      />
      <div>
        <H3 size={PossibleSizes.xs}>Always secure</H3>
        <Paragraph className={mutedText} size={PossibleSizes.lg}>
          Keep your source-code and information secure with the highest-standards measures,
          policies, and practices.{' '}
          <Link external href="/resources/security">
            Learn more
          </Link>
        </Paragraph>
      </div>
    </li>
    <li>
      <Image
        src="enterprise-offering-v1/4-secured-section/trusted.svg"
        alt="trusted"
        className={styles['bullet']}
      />
      <div>
        <H3 size={PossibleSizes.xs}>Trusted by the best</H3>
        <Paragraph className={mutedText} size={PossibleSizes.lg}>
          Watheia Labs is trusted by over 200,000 developers and teams from the world’s leading
          companies from various industry sectors.
        </Paragraph>
      </div>
    </li>
  </ul>
);
