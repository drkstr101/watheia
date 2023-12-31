import React, { HTMLAttributes } from 'react';
import classNames from 'clsx';

import { marginCenter, text, fullWidth } from '../../../base-ui.layout/align';
import { Grid } from '../../../base-ui.layout/grid-component';
import { textColumn } from '../../../base-ui.layout/page-frame';
import { Card } from '../../../base-ui.surfaces/card';
import { mutedText } from '../../../base-ui.text/muted-text';
import { Paragraph } from '../../../base-ui.elements/paragraph';
import { themedText } from '../../../base-ui.text/themed-text';
import { colorPalette } from '../../../base-ui.theme/accent-color';
import { PossibleSizes } from '../../../base-ui.theme/sizes';

import { Button } from '../../../waweb.elements/button';
import { H2, H4 } from '../../../waweb.elements/heading';
import { Icon } from '../../../waweb.elements/icon';
import { Link } from '../../../waweb.elements/link';

import styles from './advantage-cards.module.scss';

/**
 * A section showing the main advantages of the Watheia Labs enterprise solution.
 * Each card has a call to action pointing to the /contact-sales page, with a custom subject and return url.
 * @name AdvantageCards
 */
export const AdvantageCards = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={classNames(props.className)}
    data-bit-id="waweb.sections/enterprise-offering/advantage-cards"
  >
    <div className={classNames(textColumn, marginCenter, text.center)}>
      <H2 size={PossibleSizes.sm}>Watheia Labs enterprise</H2>

      <Paragraph size={PossibleSizes.lg} className={classNames(styles['paragraph'], mutedText)}>
        Everything you need to develop and ship component-driven applications at enterprise
        scale and standards.
      </Paragraph>
    </div>

    <Cards />
  </div>
);

const subjects = {
  security: encodeURIComponent('security and control'),
  support: encodeURIComponent('dedicated support'),
  build: encodeURIComponent('power to build'),
  experts: encodeURIComponent('expert consultation')
};

const redirects = {
  security: encodeURIComponent('/enterprise#contact-security'),
  support: encodeURIComponent('/enterprise#contact-support'),
  build: encodeURIComponent('/enterprise#contact-build'),
  experts: encodeURIComponent('/enterprise#contact-experts')
};

function Cards() {
  return (
    <Grid colMd={2} className={classNames(styles['particlesBg'], styles['grid'])}>
      <Card
        id="contact-security"
        className={classNames(colorPalette.neutralHeavy, styles['card'])}
      >
        <H4 size={PossibleSizes.xs} className={themedText}>
          Security and control
        </H4>
        <Paragraph size={PossibleSizes.sm} className={styles['subtitle']}>
          Keep your source-code and information secure with the highest standards. Get
          everything you need to stay in control.
        </Paragraph>

        <ul className={styles['bullets']}>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> SSO SAML
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> SOC2 Certified
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Audit logs
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Source-code encryption at
            rest
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Role-based permissions
            control
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Multiple-backups for
            everything
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> 99.9% Uptime SLA
          </li>
        </ul>
        <Link
          href={`/contact-sales?redirectUri=${redirects.security}&subject=${subjects.security}`}
        >
          <Button importance="cta" className={fullWidth}>
            Contact Sales
          </Button>
        </Link>
      </Card>

      <Card id="contact-support" className={classNames(colorPalette.process, styles['card'])}>
        <H4 size={PossibleSizes.xs} className={themedText}>
          Dedicated support
        </H4>
        <Paragraph size={PossibleSizes.sm} className={styles['subtitle']}>
          Enjoy personalized support from core Watheia Labs experts and engineers, that will
          make sure your delivery is never slowed down.
        </Paragraph>

        <ul className={styles['bullets']}>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Dedicated, named Watheia Labs
            experts
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Engineering-level support by
            core maintainers
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Joint Slack
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Response-time SLA
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Escalation paths via phone,
            chat and email
          </li>
        </ul>
        <Link
          href={`/contact-sales?redirectUri=${redirects.support}&subject=${subjects.support}`}
        >
          <Button importance="cta" className={fullWidth}>
            Contact Sales
          </Button>
        </Link>
      </Card>

      <Card id="contact-build" className={classNames(colorPalette.primary, styles['card'])}>
        <H4 size={PossibleSizes.xs} className={themedText}>
          Power to build
        </H4>
        <Paragraph size={PossibleSizes.sm} className={styles['subtitle']}>
          Get the resources and performance to build at global scale. Integrate Watheia Labs
          with your toolchain to boost delivery and time to market.
        </Paragraph>

        <ul className={styles['bullets']}>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Auto-scaling concurrent
            builds
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> CI minutes that never block
            you
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Webhook integrations
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Advanced GitHub and Slack
            integrations
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Custom extensions and
            integrations
          </li>
        </ul>
        <Link href={`/contact-sales?redirectUri=${redirects.build}&subject=${subjects.build}`}>
          <Button importance="cta" className={fullWidth}>
            Contact Sales
          </Button>
        </Link>
      </Card>

      <Card id="contact-experts" className={classNames(colorPalette.action, styles['card'])}>
        <H4 size={PossibleSizes.xs} className={themedText}>
          Expert consultation
        </H4>
        <Paragraph size={PossibleSizes.sm} className={styles['subtitle']}>
          Our architects help the world’s best teams drive development through components. We’d
          love to do the same for you.
        </Paragraph>
        <ul className={styles['bullets']}>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Industry-experts
            architectural review
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Implementing best practices
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Personalized workflows
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Hands-on A-Z onboarding
          </li>
          <li>
            <Icon of="billing-checkmark" className={themedText} /> Training for teams and
            leadership
          </li>
        </ul>
        <Link
          href={`/contact-sales?redirectUri=${redirects.experts}&subject=${subjects.experts}`}
        >
          <Button importance="cta" className={fullWidth}>
            Contact Sales
          </Button>
        </Link>
      </Card>
    </Grid>
  );
}
