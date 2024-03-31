export interface Article {
  __metadata: {
    modelType: 'page';
    id: string;
    urlPath: string;
  };
  type: 'Article';
  title: string;
  slug: string;
  date: Date;
  author?: Person;
  excerpt?: string;
  featuredImage?: ImageBlock;
  markdown_content?: string;
  bottomSections?: (
    | CarouselSection
    | DividerSection
    | FeaturedItemsSection
    | FeaturedPeopleSection
    | FeaturedPostsSection
    | GenericSection
    | ImageGallerySection
    | PricingSection
    | RecentPostsSection
  )[];
  isFeatured?: boolean;
  isDraft?: boolean;
  seo?: Seo;
  colors?:
    | 'bg-light-fg-dark'
    | 'bg-neutral-fg-dark'
    | 'bg-neutralAlt-fg-dark'
    | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface BackgroundImage {
  __metadata: {
    modelType: 'object';
  };
  type: 'BackgroundImage';
  url?: string;
  altText?: string;
  backgroundSize?: 'auto' | 'cover' | 'contain';
  backgroundPosition?:
    | 'bottom'
    | 'center'
    | 'left'
    | 'left-bottom'
    | 'left-top'
    | 'right'
    | 'right-bottom'
    | 'right-top'
    | 'top';
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  opacity?: number;
}
export interface Badge {
  __metadata: {
    modelType: 'object';
  };
  type: 'Badge';
  label: string;
  color?: 'text-black' | 'text-white' | 'text-neutral' | 'text-primary';
  styles?: Record<string, Record<string, unknown>>;
}
export interface Button {
  __metadata: {
    modelType: 'object';
  };
  type: 'Button';
  label?: string;
  altText?: string;
  url: string;
  showIcon?: boolean;
  icon?:
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUp'
    | 'chevronDown'
    | 'chevronLeft'
    | 'chevronBigLeft'
    | 'chevronRight'
    | 'chevronBigRight'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mail'
    | 'play'
    | 'reddit'
    | 'send'
    | 'shoppingBag'
    | 'twitter'
    | 'vimeo'
    | 'youtube';
  iconPosition?: 'left' | 'right';
  style?: 'primary' | 'secondary';
  elementId?: string;
}
export interface CarouselSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'CarouselSection';
  title?: TitleBlock;
  subtitle?: string;
  items?: FeaturedItem[];
  badge?: Badge;
  elementId?: string;
  variant?: 'next-prev-nav' | 'dots-nav' | 'tabs-nav';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface CheckboxFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'CheckboxFormControl';
  name: string;
  label?: string;
  isRequired?: boolean;
  width?: 'full' | '1/2';
}
export interface ColorPalette {
  __metadata: {
    modelType: 'object';
  };
  type: 'ColorPalette';
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}
export interface Config {
  __metadata: {
    modelType: 'data';
    id: string;
  };
  type: 'Config';
  favicon?: string;
  header?: Header;
  footer?: Footer;
  titleSuffix?: string;
  defaultSocialImage?: string;
  defaultMetaTags?: MetaTag[];
}
export interface DividerSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'DividerSection';
  title?: string;
  elementId?: string;
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface EmailFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'EmailFormControl';
  name?: string;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  width?: 'full' | '1/2';
}
export interface FeaturedItem {
  __metadata: {
    modelType: 'object';
  };
  type: 'FeaturedItem';
  title: string;
  tagline?: string;
  subtitle?: string;
  text?: string;
  image?: ImageBlock;
  actions?: (Button | Link)[];
  elementId?: string;
  colors?:
    | 'bg-light-fg-dark'
    | 'bg-neutral-fg-dark'
    | 'bg-neutralAlt-fg-dark'
    | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface FeaturedItemsSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'FeaturedItemsSection';
  title?: TitleBlock;
  subtitle?: string;
  items?: FeaturedItem[];
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'two-col-grid' | 'three-col-grid' | 'small-list' | 'big-list' | 'toggle-list';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface FeaturedPeopleSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'FeaturedPeopleSection';
  title?: TitleBlock;
  subtitle?: string;
  people?: Person[];
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'three-col-grid' | 'four-col-grid' | 'mixed-grid';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface FeaturedPostsSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'FeaturedPostsSection';
  title?: TitleBlock;
  subtitle?: string;
  posts?: Article[];
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'two-col-grid' | 'three-col-grid' | 'small-list' | 'big-list';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface Footer {
  __metadata: {
    modelType: 'data';
    id: string;
  };
  type: 'Footer';
  logo?: ImageBlock;
  title?: string;
  text?: string;
  primaryLinks?: FooterLinksGroup;
  secondaryLinks?: FooterLinksGroup;
  socialLinks?: Social[];
  legalLinks?: Link[];
  copyrightText?: string;
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface FooterLinksGroup {
  __metadata: {
    modelType: 'object';
  };
  type: 'FooterLinksGroup';
  title?: string;
  links?: (Button | Link)[];
  styles?: unknown;
}
export interface FormBlock {
  __metadata: {
    modelType: 'object';
  };
  type: 'FormBlock';
  fields?: (
    | TextFormControl
    | EmailFormControl
    | TextareaFormControl
    | CheckboxFormControl
    | SelectFormControl
  )[];
  submitButton?: SubmitButtonFormControl;
  action?: string;
  destination?: string;
  elementId: string;
  styles?: Record<string, Record<string, unknown>>;
}
export interface GenericSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'GenericSection';
  title?: TitleBlock;
  subtitle?: string;
  text?: string;
  actions?: (Button | Link)[];
  media?: FormBlock | ImageBlock | VideoBlock;
  badge?: Badge;
  elementId?: string;
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface Header {
  __metadata: {
    modelType: 'data';
    id: string;
  };
  type: 'Header';
  title?: string;
  logo?: ImageBlock;
  primaryLinks?: (Button | Link | SubNav)[];
  secondaryLinks?: (Button | Link)[];
  variant?:
    | 'logo-left-primary-nav-left'
    | 'logo-left-primary-nav-centered'
    | 'logo-left-primary-nav-right'
    | 'logo-centered-primary-nav-left'
    | 'logo-centered-primary-nav-centered';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface ImageBlock {
  __metadata: {
    modelType: 'object';
  };
  type: 'ImageBlock';
  url?: string;
  altText?: string;
  elementId?: string;
  styles?: Record<string, Record<string, unknown>>;
}
export interface ImageGallerySection {
  __metadata: {
    modelType: 'object';
  };
  type: 'ImageGallerySection';
  title?: TitleBlock;
  subtitle?: string;
  images?: ImageBlock[];
  badge?: Badge;
  elementId?: string;
  motion?: 'static' | 'move-to-left' | 'move-to-right';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface Link {
  __metadata: {
    modelType: 'object';
  };
  type: 'Link';
  label?: string;
  altText?: string;
  url: string;
  showIcon?: boolean;
  icon?:
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUp'
    | 'chevronDown'
    | 'chevronLeft'
    | 'chevronBigLeft'
    | 'chevronRight'
    | 'chevronBigRight'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mail'
    | 'play'
    | 'reddit'
    | 'send'
    | 'shoppingBag'
    | 'twitter'
    | 'vimeo'
    | 'youtube';
  iconPosition?: 'left' | 'right';
  style?: 'primary' | 'secondary';
  elementId?: string;
}
export interface MetaTag {
  __metadata: {
    modelType: 'object';
  };
  type: 'MetaTag';
  property?:
    | 'og:title'
    | 'og:type'
    | 'og:image'
    | 'og:image:alt'
    | 'og:url'
    | 'og:description'
    | 'og:locale'
    | 'og:site_name'
    | 'og:video'
    | 'twitter:card'
    | 'twitter:site'
    | 'twitter:creator'
    | 'twitter:description'
    | 'twitter:title'
    | 'twitter:image'
    | 'twitter:image:alt'
    | 'twitter:player';
  content?: string;
}
export interface Page {
  __metadata: {
    modelType: 'page';
    id: string;
    urlPath: string;
  };
  type: 'Page';
  title: string;
  slug: string;
  sections?: (
    | CarouselSection
    | DividerSection
    | FeaturedItemsSection
    | FeaturedPeopleSection
    | FeaturedPostsSection
    | GenericSection
    | ImageGallerySection
    | PricingSection
    | RecentPostsSection
  )[];
  isDraft?: boolean;
  seo?: Seo;
  markdown_content?: string;
}
export interface PagedPostsSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'PagedPostsSection';
  title?: TitleBlock;
  subtitle?: string;
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'two-col-grid' | 'three-col-grid' | 'small-list' | 'big-list';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface Person {
  __metadata: {
    modelType: 'data';
    id: string;
  };
  type: 'Person';
  name: string;
  role?: string;
  bio?: string;
  image?: ImageBlock;
  colors?:
    | 'bg-light-fg-dark'
    | 'bg-neutral-fg-dark'
    | 'bg-neutralAlt-fg-dark'
    | 'bg-dark-fg-light';
  elementId?: string;
  styles?: Record<string, Record<string, unknown>>;
}
export interface PostFeedLayout {
  __metadata: {
    modelType: 'page';
    id: string;
    urlPath: string;
  };
  type: 'PostFeedLayout';
  title?: string;
  slug: string;
  postFeed?: PagedPostsSection;
  numOfPostsPerPage?: number;
  enableSearch?: boolean;
  topSections?: (
    | CarouselSection
    | DividerSection
    | FeaturedItemsSection
    | FeaturedPeopleSection
    | FeaturedPostsSection
    | GenericSection
    | ImageGallerySection
    | PricingSection
    | RecentPostsSection
  )[];
  bottomSections?: (
    | CarouselSection
    | DividerSection
    | FeaturedItemsSection
    | FeaturedPeopleSection
    | FeaturedPostsSection
    | GenericSection
    | ImageGallerySection
    | PricingSection
    | RecentPostsSection
  )[];
  isDraft?: boolean;
  styles?: Record<string, Record<string, unknown>>;
  seo?: Seo;
  markdown_content?: string;
}
export interface PostFeedSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'PostFeedSection';
  title?: TitleBlock;
  subtitle?: string;
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'two-col-grid' | 'three-col-grid' | 'small-list' | 'big-list';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface PricingPlan {
  __metadata: {
    modelType: 'object';
  };
  type: 'PricingPlan';
  title?: string;
  price?: string;
  details?: string;
  description?: string;
  features?: string[];
  image?: ImageBlock;
  actions?: (Button | Link)[];
  elementId?: string;
  colors?:
    | 'bg-light-fg-dark'
    | 'bg-neutral-fg-dark'
    | 'bg-neutralAlt-fg-dark'
    | 'bg-dark-fg-light';
  styles?: Record<string, Record<string, unknown>>;
}
export interface PricingSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'PricingSection';
  title?: TitleBlock;
  subtitle?: string;
  plans?: PricingPlan[];
  badge?: Badge;
  elementId?: string;
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface RecentPostsSection {
  __metadata: {
    modelType: 'object';
  };
  type: 'RecentPostsSection';
  title?: TitleBlock;
  subtitle?: string;
  recentCount?: number;
  showThumbnail?: boolean;
  showExcerpt?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  actions?: (Button | Link)[];
  badge?: Badge;
  elementId?: string;
  variant?: 'two-col-grid' | 'three-col-grid' | 'small-list' | 'big-list';
  colors?: 'bg-light-fg-dark' | 'bg-neutral-fg-dark' | 'bg-dark-fg-light';
  backgroundImage?: BackgroundImage;
  styles?: Record<string, Record<string, unknown>>;
}
export interface SelectFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'SelectFormControl';
  name: string;
  label?: string;
  hideLabel?: boolean;
  defaultValue?: string;
  options?: string[];
  isRequired?: boolean;
  width?: 'full' | '1/2';
}
export interface Seo {
  __metadata: {
    modelType: 'object';
  };
  type: 'Seo';
  metaTitle?: string;
  metaDescription?: string;
  addTitleSuffix?: boolean;
  socialImage?: string;
  metaTags?: MetaTag[];
}
export interface Social {
  __metadata: {
    modelType: 'object';
  };
  type: 'Social';
  altText?: string;
  url: string;
  icon:
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mail'
    | 'reddit'
    | 'twitter'
    | 'vimeo'
    | 'youtube';
  elementId?: string;
}
export interface SubNav {
  __metadata: {
    modelType: 'object';
  };
  type: 'SubNav';
  label?: string;
  altText?: string;
  links?: Link[];
  labelStyle?: 'primary' | 'secondary';
}
export interface SubmitButtonFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'SubmitButtonFormControl';
  label?: string;
  showIcon?: boolean;
  icon?:
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUp'
    | 'chevronDown'
    | 'chevronLeft'
    | 'chevronBigLeft'
    | 'chevronRight'
    | 'chevronBigRight'
    | 'facebook'
    | 'github'
    | 'instagram'
    | 'linkedin'
    | 'mail'
    | 'play'
    | 'reddit'
    | 'send'
    | 'shoppingBag'
    | 'twitter'
    | 'vimeo'
    | 'youtube';
  iconPosition?: 'left' | 'right';
  style?: 'primary' | 'secondary';
  elementId?: string;
}
export interface TextFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'TextFormControl';
  name: string;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  width?: 'full' | '1/2';
}
export interface TextareaFormControl {
  __metadata: {
    modelType: 'object';
  };
  type: 'TextareaFormControl';
  name: string;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  width?: 'full' | '1/2';
}
export interface ThemeStyle {
  __metadata: {
    modelType: 'data';
    id: string;
  };
  type: 'ThemeStyle';
  colors: {
    black: string;
    white: string;
    neutral: ColorPalette;
    primary: ColorPalette;
    secondary: ColorPalette;
    accent: ColorPalette;
    info: ColorPalette;
    success: ColorPalette;
    warning: ColorPalette;
    danger: ColorPalette;
  };
  fontBody?: 'sans' | 'serif';
  fontHeadlines?: 'sans' | 'serif';
  h1?: ThemeStyleHeading;
  h2?: ThemeStyleHeading;
  h3?: ThemeStyleHeading;
  h4?: ThemeStyleHeading;
  h5?: ThemeStyleHeading;
  h6?: ThemeStyleHeading;
  buttonPrimary?: ThemeStyleButton;
  buttonSecondary?: ThemeStyleButton;
  linkPrimary?: ThemeStyleLink;
  linkSecondary?: ThemeStyleLink;
}
export interface ThemeStyleButton {
  __metadata: {
    modelType: 'object';
  };
  type: 'ThemeStyleButton';
  weight?: 'normal' | 'medium' | 'bold';
  case?: 'none' | 'lowercase' | 'capitalize' | 'uppercase';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
  borderRadius?: 'none' | 'DEFAULT' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'md' | 'xl';
  horizontalPadding?: number;
  verticalPadding?: number;
}
export interface ThemeStyleHeading {
  __metadata: {
    modelType: 'object';
  };
  type: 'ThemeStyleHeading';
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  weight?: 'normal' | 'medium' | 'bold';
  decoration?: 'none' | 'underline' | 'line-through';
  case?: 'none' | 'lowercase' | 'capitalize' | 'uppercase';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
}
export interface ThemeStyleLink {
  __metadata: {
    modelType: 'object';
  };
  type: 'ThemeStyleLink';
  weight?: 'normal' | 'medium' | 'bold';
  case?: 'none' | 'lowercase' | 'capitalize' | 'uppercase';
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
}
export interface TitleBlock {
  __metadata: {
    modelType: 'object';
  };
  type: 'TitleBlock';
  text?: string;
  color?: 'text-black' | 'text-white' | 'text-neutral' | 'text-primary';
  styles?: Record<string, Record<string, unknown>>;
}
export interface VideoBlock {
  __metadata: {
    modelType: 'object';
  };
  type: 'VideoBlock';
  title?: string;
  url?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  aspectRatio?: '4:3' | '16:9';
  elementId?: string;
  styles?: Record<string, Record<string, unknown>>;
}
