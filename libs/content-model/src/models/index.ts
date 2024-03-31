import { Article } from './Article';
import { BackgroundImage } from './BackgroundImage';
import { Badge } from './Badge';
import { Button } from './Button';
import { CarouselSection } from './CarouselSection';
import { CheckboxFormControl } from './CheckboxFormControl';
import { ColorPalette } from './ColorPalette';
import { Config } from './Config';
import { DividerSection } from './DividerSection';
import { EmailFormControl } from './EmailFormControl';
import { FeaturedItem } from './FeaturedItem';
import { FeaturedItemsSection } from './FeaturedItemsSection';
import { FeaturedPeopleSection } from './FeaturedPeopleSection';
import { FeaturedPostsSection } from './FeaturedPostsSection';
import { Footer } from './Footer';
import { FormBlock } from './FormBlock';
import { GenericSection } from './GenericSection';
import { Header } from './Header';
import { ImageBlock } from './ImageBlock';
import { ImageGallerySection } from './ImageGallerySection';
import { Link } from './Link';
import { Page } from './Page';
import { PagedPostsSection } from './PagedPostsSection';
import { Person } from './Person';
import { PostFeedLayout } from './PostFeedLayout';
import { PostFeedSection } from './PostFeedSection';
import { PricingPlan } from './PricingPlan';
import { PricingSection } from './PricingSection';
import { RecentPostsSection } from './RecentPostsSection';
import { SelectFormControl } from './SelectFormControl';
import { Social } from './Social';
import { SubNav } from './SubNav';
import { SubmitButtonFormControl } from './SubmitButtonFormControl';
import { TextFormControl } from './TextFormControl';
import { TextareaFormControl } from './TextareaFormControl';
import { ThemeStyle } from './ThemeStyle';
import { ThemeStyleButton } from './ThemeStyleButton';
import { ThemeStyleHeading } from './ThemeStyleHeading';
import { ThemeStyleLink } from './ThemeStyleLink';
import { TitleBlock } from './TitleBlock';
import { VideoBlock } from './VideoBlock';
import { FooterLinksGroup } from './FooterLinksGroup';
import { MetaTag } from './MetaTag';
import { Seo } from './Seo';

export const models = {
  BackgroundImage,
  Badge,
  Button,
  CarouselSection,
  CheckboxFormControl,
  ColorPalette,
  Config,
  DividerSection,
  EmailFormControl,
  FeaturedItem,
  FeaturedItemsSection,
  FeaturedPeopleSection,
  FeaturedPostsSection,
  Footer,
  FormBlock,
  GenericSection,
  Header,
  ImageBlock,
  ImageGallerySection,
  Link,
  Page,
  PagedPostsSection,
  Person,
  PostFeedLayout,
  PostFeedSection,
  Article,
  PricingPlan,
  PricingSection,
  RecentPostsSection,
  SelectFormControl,
  Social,
  SubNav,
  SubmitButtonFormControl,
  TextFormControl,
  TextareaFormControl,
  ThemeStyle,
  ThemeStyleButton,
  ThemeStyleHeading,
  ThemeStyleLink,
  TitleBlock,
  VideoBlock,
  MetaTag,
  FooterLinksGroup,
  Seo,
} as const;

export type WatheiaModel = typeof models;

export type ModelName = keyof WatheiaModel;

export const ALL_MODEL_NAMES = Object.keys(models) as ModelName[];
