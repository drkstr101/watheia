import { Button } from './models/Button';
import { Card } from './models/Card';
import { CardsSection } from './models/CardsSection';
import { Config } from './models/Config';
import { Footer } from './models/Footer';
import { Header } from './models/Header';
import { HeroSection } from './models/HeroSection';
import { Image } from './models/Image';
import { Link } from './models/Link';
import { Page } from './models/Page';
import { Theme } from './models/Theme';

const model = {
  Button,
  Card,
  CardsSection,
  Config,
  Footer,
  Header,
  HeroSection,
  Image,
  Link,
  Page,
  Theme,
} as const;

export type { ConfigModel, DataModel, Model, ObjectModel, PageModel } from '@stackbit/types';

export type * as types from './content-model.types';

export type ContentModel = typeof model;

export type ModelName = keyof ContentModel;

export default model;
