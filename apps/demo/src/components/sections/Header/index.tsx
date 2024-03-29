import classNames from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { Action, Link } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ChevronDownIcon from '../../svgs/chevron-down';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
  const { colors = 'bg-light-fg-dark', styles = {} } = props;
  return (
    <header
      className={classNames(
        'sb-component',
        'sb-component-header',
        colors,
        'relative',
        'shadow-header',
        styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
        styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'p-4',
        'z-50'
      )}
      data-sb-object-id={props['data-sb-object-id']}
    >
      <div className="max-w-7xl mx-auto">
        <Link href="#main" className="sr-only">
          Skip to main content
        </Link>
        <HeaderVariants {...props} />
      </div>
    </header>
  );
}

function HeaderVariants(props) {
  const { variant = 'logo-left-primary-nav-left', ...rest } = props;
  switch (variant) {
    case 'logo-left-primary-nav-centered':
      return <HeaderLogoLeftPrimaryCentered {...rest} />;
    case 'logo-left-primary-nav-right':
      return <HeaderLogoLeftPrimaryRight {...rest} />;
    case 'logo-centered-primary-nav-left':
      return <HeaderLogoCenteredPrimaryLeft {...rest} />;
    case 'logo-centered-primary-nav-centered':
      return <HeaderLogoCenteredPrimaryCentered {...rest} />;
    default:
      return <HeaderLogoLeftPrimaryLeft {...rest} />;
  }
}

function HeaderLogoLeftPrimaryLeft(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
  } = props;
  return (
    <div className="flex items-center relative">
      {(title || logo?.url) && (
        <div className="mr-10">
          <SiteLogoLink title={title} logo={logo} />
        </div>
      )}
      {primaryLinks.length > 0 && (
        <ul
          className="hidden mr-10 gap-x-10 lg:flex lg:items-center"
          data-sb-field-path=".primaryLinks"
        >
          <ListOfLinks links={primaryLinks} colors={colors} />
        </ul>
      )}
      {secondaryLinks.length > 0 && (
        <ul
          className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center"
          data-sb-field-path=".secondaryLinks"
        >
          <ListOfLinks links={secondaryLinks} />
        </ul>
      )}
      {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderLogoLeftPrimaryCentered(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
  } = props;
  return (
    <div className="flex items-center relative">
      {(title || logo?.url) && (
        <div className="mr-10">
          <SiteLogoLink title={title} logo={logo} />
        </div>
      )}
      {primaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center gap-x-10 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-auto"
          data-sb-field-path=".primaryLinks"
        >
          <ListOfLinks links={primaryLinks} colors={colors} />
        </ul>
      )}
      {secondaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center ml-auto gap-x-2.5"
          data-sb-field-path=".secondaryLinks"
        >
          <ListOfLinks links={secondaryLinks} />
        </ul>
      )}
      {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderLogoLeftPrimaryRight(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
  } = props;
  return (
    <div className="flex items-center relative">
      {(title || logo?.url) && (
        <div className="mr-10">
          <SiteLogoLink title={title} logo={logo} />
        </div>
      )}
      {primaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center ml-auto gap-x-10"
          data-sb-field-path=".primaryLinks"
        >
          <ListOfLinks links={primaryLinks} colors={colors} />
        </ul>
      )}
      {secondaryLinks.length > 0 && (
        <ul
          className={classNames(
            'hidden',
            'lg:flex',
            'lg:items-center',
            'gap-x-2.5',
            primaryLinks.length > 0 ? 'ml-10' : 'ml-auto'
          )}
          data-sb-field-path=".secondaryLinks"
        >
          <ListOfLinks links={secondaryLinks} />
        </ul>
      )}
      {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderLogoCenteredPrimaryLeft(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
  } = props;
  return (
    <div className="flex items-center relative">
      {(title || logo?.url) && (
        <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
          <SiteLogoLink title={title} logo={logo} />
        </div>
      )}
      {primaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center gap-x-10"
          data-sb-field-path=".primaryLinks"
        >
          <ListOfLinks links={primaryLinks} colors={colors} />
        </ul>
      )}
      {secondaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center ml-auto gap-x-2.5"
          data-sb-field-path=".secondaryLinks"
        >
          <ListOfLinks links={secondaryLinks} />
        </ul>
      )}
      {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
    </div>
  );
}

function HeaderLogoCenteredPrimaryCentered(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
  } = props;
  return (
    <>
      <div className="flex items-center relative">
        {(title || logo?.url) && (
          <div className="mr-10 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:-translate-x-1/2">
            <SiteLogoLink title={title} logo={logo} />
          </div>
        )}
        {secondaryLinks.length > 0 && (
          <ul
            className="hidden lg:flex lg:items-center gap-x-2.5 ml-auto"
            data-sb-field-path=".secondaryLinks"
          >
            <ListOfLinks links={secondaryLinks} />
          </ul>
        )}
        {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
      </div>
      {primaryLinks.length > 0 && (
        <ul
          className="hidden lg:flex lg:items-center lg:justify-center gap-x-10 mt-4"
          data-sb-field-path=".primaryLinks"
        >
          <ListOfLinks links={primaryLinks} colors={colors} />
        </ul>
      )}
    </>
  );
}

function MobileMenu(props) {
  const {
    title,
    logo,
    primaryLinks = [],
    secondaryLinks = [],
    colors = 'bg-light-fg-dark',
    styles = {},
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const openMobileMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      document.body.style.overflow = 'unset';
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        aria-label="Open Menu"
        title="Open Menu"
        className="p-2 -mr-1 focus:outline-none"
        onClick={openMobileMenu}
      >
        <span className="sr-only">Open Menu</span>
        <MenuIcon className="fill-current h-6 w-6" />
      </button>
      <div
        className={classNames(
          colors,
          'fixed',
          'inset-0',
          styles?.self?.padding ?? 'p-4',
          'overflow-y-auto',
          'z-10',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-10">
            {(title || logo?.url) && <SiteLogoLink title={title} logo={logo} />}
            <button
              aria-label="Close Menu"
              title="Close Menu"
              className="p-2 -mr-1 focus:outline-none"
              onClick={closeMobileMenu}
            >
              <CloseIcon className="fill-current h-6 w-6" />
            </button>
          </div>
          {primaryLinks.length > 0 && (
            <ul data-sb-field-path=".primaryLinks">
              <ListOfLinks links={primaryLinks} inMobileMenu />
            </ul>
          )}
          {secondaryLinks.length > 0 && (
            <ul data-sb-field-path=".secondaryLinks">
              <ListOfLinks links={secondaryLinks} inMobileMenu />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function SiteLogoLink({ title, logo }) {
  return (
    <Link href="/" className="flex items-center">
      {logo && <ImageBlock {...logo} data-sb-field-path=".logo" />}
      {title && (
        <span className="h4" data-sb-field-path=".title">
          {title}
        </span>
      )}
    </Link>
  );
}

function ListOfLinks(props) {
  const { links = [] as any[], colors, inMobileMenu = false } = props;

  return (
    <>
      {links.map((link, index) => {
        if (link.__metadata.modelName === 'SubNav') {
          return (
            <LinkWithSubnav
              key={index}
              link={link}
              inMobileMenu={inMobileMenu}
              colors={colors}
              data-sb-field-path={`.${index}`}
            />
          );
        } else {
          return (
            <li
              key={index}
              className={classNames(inMobileMenu ? 'border-t' : 'py-2', {
                'py-4': inMobileMenu && link.__metadata.modelName === 'Button',
              })}
            >
              <Action
                {...link}
                className={classNames('whitespace-nowrap', inMobileMenu ? 'w-full' : 'text-sm', {
                  'justify-start py-3': inMobileMenu && link.__metadata.modelName === 'Link',
                })}
                data-sb-field-path={`.${index}`}
              />
            </li>
          );
        }
      })}
    </>
  );
}

function LinkWithSubnav(props) {
  const { link, colors, inMobileMenu = false } = props;
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsSubNavOpen(false);
      document.body.style.overflow = 'unset';
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <li
      className={classNames('relative', inMobileMenu ? 'border-t py-3' : 'py-2 group')}
      onMouseLeave={
        !process.env.stackbitPreview && !inMobileMenu
          ? () => {
              setIsSubNavOpen(false);
            }
          : undefined
      }
      data-sb-field-path={props['data-sb-field-path']}
    >
      <button
        aria-expanded={isSubNavOpen ? 'true' : 'false'}
        onMouseOver={
          !process.env.stackbitPreview && !inMobileMenu
            ? () => {
                setIsSubNavOpen(true);
              }
            : undefined
        }
        onClick={() => setIsSubNavOpen((prev) => !prev)}
        className={classNames(
          'sb-component',
          'sb-component-block',
          'sb-component-link',
          link.labelStyle === 'secondary'
            ? 'sb-component-link-secondary'
            : 'sb-component-link-primary',
          'inline-flex',
          'items-center',
          inMobileMenu ? 'w-full' : 'text-sm',
          {
            'group-hover:no-underline hover:no-underline':
              !inMobileMenu && (link.labelStyle ?? 'primary') === 'primary',
            'group-hover:text-primary': !inMobileMenu && link.labelStyle === 'secondary',
          }
        )}
      >
        <span data-sb-field-path=".label">{link.label}</span>
        <ChevronDownIcon
          className={classNames(
            'fill-current',
            'shrink-0',
            'h-4',
            'w-4',
            isSubNavOpen && 'rotate-180',
            inMobileMenu ? 'ml-auto' : 'ml-1'
          )}
        />
      </button>
      {(link.links ?? []).length > 0 && (
        <ul
          className={classNames(
            colors,
            inMobileMenu
              ? 'p-4 space-y-3'
              : 'absolute top-full left-0 w-44 border-t border-primary shadow-header z-10 px-6 pt-5 pb-6 space-y-4',
            isSubNavOpen ? 'block' : 'hidden'
          )}
          data-sb-field-path=".links"
        >
          <ListOfSubNavLinks links={link.links} inMobileMenu={inMobileMenu} />
        </ul>
      )}
    </li>
  );
}

function ListOfSubNavLinks({ links = [] as any[], inMobileMenu = false }) {
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <Action
            {...link}
            className={classNames(inMobileMenu ? 'w-full justify-start' : 'text-sm')}
            data-sb-field-path={`.${index}`}
          />
        </li>
      ))}
    </>
  );
}
