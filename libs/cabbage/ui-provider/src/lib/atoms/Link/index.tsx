import NextLink from 'next/link';

// export type LinkProps = types.Link &
//   StackbitElement &
//   HtmlHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Link({ children, href, ...other }) {
  // Pass Any internal link to Next.js Link, for anything else, use <a> tag
  const internal = /^\/(?!\/)/.test(href);
  if (internal) {
    return (
      <NextLink href={href} legacyBehavior>
        <a {...other}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} {...other}>
      {children}
    </a>
  );
}
