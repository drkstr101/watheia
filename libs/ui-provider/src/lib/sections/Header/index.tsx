'use client';

import classNames from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Action, Link, Social } from '../../atoms';
import ImageBlock from '../../molecules/ImageBlock';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
  const {
    headerVariant,
    isSticky,
    title,
    isTitleVisible,
    logo,
    primaryLinks = [],
    socialLinks = [],
    styles = {},
  } = props;
  const headerWidth = styles.self?.width ?? 'narrow';
  return (
    <header
      className={classNames(
        'wa-component',
        'wa-header',
        isSticky ? 'sticky top-0 z-10' : 'relative',
        'border-b',
        'border-current'
      )}
    >
      <div
        className={classNames('mx-auto', mapMaxWidthStyles(headerWidth), {
          'border-current xl:border-l xl:border-r': headerWidth === 'narrow',
          'border-current 2xl:border-l 2xl:border-r': headerWidth === 'wide',
        })}
      >
        <Link href="#main" className="sr-only">
          Skip to main content
        </Link>
        <HeaderVariants
          variant={headerVariant}
          title={title}
          isTitleVisible={isTitleVisible}
          logo={logo}
          primaryLinks={primaryLinks}
          socialLinks={socialLinks}
        />
      </div>
    </header>
  );
}

function HeaderVariants(props) {
  const { variant = 'variant-a', ...rest } = props;
  switch (variant) {
    case 'variant-a':
      return <HeaderVariantA {...rest} />;
    case 'variant-b':
      return <HeaderVariantB {...rest} />;
    case 'variant-c':
      return <HeaderVariantC {...rest} />;
    default:
      return null;
  }
}

function HeaderVariantA(props) {
  const { primaryLinks = [], socialLinks = [], ...logoProps } = props;
  return (
    <div className="relative flex items-stretch">
      <SiteLogoLink {...logoProps} />
      {primaryLinks.length > 0 && (
        <ul className="hidden divide-x divide-current border-r border-current lg:flex">
          <ListOfLinks links={primaryLinks} inMobileMenu={false} />
        </ul>
      )}
      {socialLinks.length > 0 && (
        <ul className="ml-auto hidden border-l border-current lg:flex">
          <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
        </ul>
      )}
      {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderVariantB(props) {
  const { primaryLinks = [], socialLinks = [], ...logoProps } = props;
  return (
    <div className="relative flex items-stretch">
      <SiteLogoLink {...logoProps} />
      {primaryLinks.length > 0 && (
        <ul className="ml-auto hidden divide-x divide-current border-l border-current lg:flex">
          <ListOfLinks links={primaryLinks} inMobileMenu={false} />
        </ul>
      )}
      {socialLinks.length > 0 && (
        <ul
          className={classNames('hidden', 'lg:flex', 'border-l', 'border-current', {
            'ml-auto': primaryLinks.length === 0,
          })}
        >
          <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
        </ul>
      )}
      {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderVariantC(props) {
  const { primaryLinks = [], socialLinks = [], ...logoProps } = props;
  return (
    <div className="relative flex items-stretch">
      <SiteLogoLink {...logoProps} />
      {socialLinks.length > 0 && (
        <ul className="ml-auto hidden border-l border-current lg:flex">
          <ListOfSocialLinks links={socialLinks} inMobileMenu={false} />
        </ul>
      )}
      {primaryLinks.length > 0 && (
        <ul
          className={classNames(
            'hidden',
            'lg:flex',
            'border-l',
            'border-current',
            'divide-x',
            'divide-current',
            {
              'ml-auto': primaryLinks.length === 0,
            }
          )}
        >
          <ListOfLinks links={primaryLinks} inMobileMenu={false} />
        </ul>
      )}
      {(primaryLinks.length > 0 || socialLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function MobileMenu(props) {
  const { primaryLinks = [], socialLinks = [], ...logoProps } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // force close menu on navigation change
  useEffect(() => {
    setIsMenuOpen(false);
    const url = `${pathname}?${searchParams}`;
    console.log(url);
  }, [pathname, searchParams]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        aria-label="Open Menu"
        className="h-10 min-h-full border-l border-current p-4 focus:outline-none"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="sr-only">Open Menu</span>
        <MenuIcon className="h-6 w-6 fill-current" />
      </button>
      <div
        className={classNames(
          'wa-header-overlay',
          'fixed',
          'inset-0',
          'overflow-y-auto',
          'z-20',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex items-stretch justify-between border-b border-current">
            <SiteLogoLink {...logoProps} />
            <div className="border-l border-current">
              <button
                aria-label="Close Menu"
                className="h-10 min-h-full p-4 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon className="h-6 w-6 fill-current" />
              </button>
            </div>
          </div>
          {(primaryLinks.length > 0 || socialLinks.length > 0) && (
            <div className="flex grow flex-col justify-center space-y-12 px-4 py-20">
              {primaryLinks.length > 0 && (
                <ul className="space-y-6">
                  <ListOfLinks links={primaryLinks} inMobileMenu={true} />
                </ul>
              )}
              {socialLinks.length > 0 && (
                <ul className="flex flex-wrap justify-center">
                  <ListOfSocialLinks links={socialLinks} inMobileMenu={true} />
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SiteLogoLink({ title, isTitleVisible, logo }) {
  if (!(logo || (title && isTitleVisible))) {
    return null;
  }
  return (
    <div className="flex items-center border-r border-current">
      <Link href="/" className="wa-header-logo flex h-full items-center p-4">
        {logo && (
          <ImageBlock {...logo} className={classNames('max-h-12', { 'mr-2': isTitleVisible })} />
        )}
        {title && isTitleVisible && (
          <span className="text-base uppercase tracking-widest">{title}</span>
        )}
      </Link>
    </div>
  );
}

function ListOfLinks({ links, inMobileMenu }) {
  return links.map((link, index) => (
    <li
      key={index}
      className={classNames(inMobileMenu ? 'w-full text-center' : 'inline-flex items-stretch')}
    >
      <Action
        {...link}
        className={classNames(
          inMobileMenu ? 'text-xl' : 'wa-link-fill p-4',
          'font-normal',
          'text-base',
          'tracking-widest',
          'uppercase'
        )}
      />
    </li>
  ));
}

function ListOfSocialLinks({ links, inMobileMenu = false }) {
  return links.map((link, index) => (
    <li
      key={index}
      className={classNames(
        inMobileMenu ? '-ml-px -mt-px border border-current' : 'inline-flex items-stretch'
      )}
    >
      <Social
        {...link}
        className={classNames('wa-social-fill', 'text-base', inMobileMenu ? 'p-5' : 'p-4')}
      />
    </li>
  ));
}

function mapMaxWidthStyles(width) {
  switch (width) {
    case 'narrow':
      return 'max-w-7xl';
    case 'wide':
      return 'max-w-screen-2xl';
    case 'full':
      return 'max-w-full';
    default:
      return null;
  }
}
