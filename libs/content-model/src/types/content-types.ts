// Objects
// -------
// Objects are reusable data structures embedded in other documents and have no direct API
// methods to access or update independently.
////

export interface Header {
  type: 'Header';
  __metadata: { type: 'object'; id: string };
  navLinks?: Link[];
}

export interface Footer {
  type: 'Footer';
  __metadata: { type: 'object'; id: string };
  navLinks?: Link[];
  copyrightText: string;
}

export interface Testimonial {
  type: 'Testimonial';
  __metadata: { type: 'object'; id: string };
  content: string;
  author: { name: string; role: string };
}

// Atoms
// The lowest level UI elements on a page.
////

/**
 * Button model props
 */
export interface Button {
  type: 'Button';
  __metadata: { type: 'object'; id: string };
  label: string;
  url: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'clear';
  color:
    | 'default'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger';
}

export interface Image {
  type: 'Image';
  __metadata: { type: 'object'; id: string };
  src: string;
  altText: string;
}

export interface Link {
  type: 'Link';
  __metadata: { type: 'object'; id: string };
  label: string;
  href: string;
  /** @deprecated Use proper context styles instead */
  underline?: 'alway' | 'hover' | 'none';
  color?: 'neutral' | 'primary' | 'secondary' | 'accent';
}

// Molecules
// A complex block UI element. May compose multiple other blocks atoms or
// molecules together and usually expands to take up the available width, but
// can be configured to display in-line as well.
////

export interface Card {
  type: 'Card';
  __metadata: { id: string; type: 'object' };
  text?: string;
  image?: Image;
  actions?: Button[];
}

// Sections
// Sections are a specific kind of molecule. They are the top-level elements contained
// by a page, and who's labels may affect navigation or the rendering of a ToC for the page
////

export interface HeroSection {
  type: 'HeroSection';
  __metadata: { type: 'object'; id: string };
  title?: string;
  subtitle?: string;
  text?: string;
  actions?: Button[];
  image?: Image;
}

// Data
// ---------
// Global static data not represented by any specific UI element. Some documents may also make
// contributions to the site routes but is not required to do so.
////

export interface Theme {
  type: 'Theme';
  __metadata: { type: 'data'; id: string };
  // TODO configure color palettes
}

export interface Config {
  type: 'Config';
  __metadata: { type: 'data'; id: string };
  favicon?: string;
  header?: Header;
  footer?: Footer;
}

export interface Person {
  type: 'Person';
  __metadata: { type: 'data'; id: string };
  name: string;
  fullName: string;
  role: string;
  image?: Image;
}

// Pages
// Pages are entrypoints into the content. Pages are a type of document data that make contributions
// to the site routes.

type PageMeta = {
  type: 'page';
  id: string;
  urlPath: string;
  rawContent?: string;
};

export interface Page {
  type: 'Page';
  __metadata: PageMeta;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  sections?: HeroSection[];
}

export interface Article {
  type: 'Article';
  __metadata: PageMeta;
  slug: string;
  title: string;
  description: string;
  date: Date;
}

export interface CaseStudy {
  type: 'CaseStudy';
  __metadata: PageMeta;
  slug: string;
  title: string;
  description: string;
  date: Date;
  summary: string[];
  client: string;
  logo: string;
  image: Image;
  services: string[];
  testimonial: Testimonial;
}
