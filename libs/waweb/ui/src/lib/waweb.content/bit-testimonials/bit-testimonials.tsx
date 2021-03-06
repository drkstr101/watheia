import React from 'react';
import { staticStorageUrl } from '../../base-ui.constants/storage';
import type { TestimonialObj } from '../../waweb.marketing/testimonial';

const desc0 = () => (
  <div>
    Senior Engineer, Microsoft.
    <br />
    Former NPM architect
  </div>
);

const desc5 = () => (
  <div>
    Principal Engineer, Eaze.
    <br />
    Former NPM CTO
  </div>
);

/**
 * @name bitTestimonials
 * @description
 * Content for [CommentCarousel](https://bit.dev/bit/evangelist/marketing/comment-carousel).
 */

export const bitTestimonials: TestimonialObj[] = [
  {
    content: "“I just found out about Watheia Labs and holy cow that's a cool product”",
    name: 'Kat Marchan',
    description: desc0(),
    avatar: `${staticStorageUrl}/comment-carousel/kat.png`
  },
  {
    content:
      '“Watheia Labs with module federation is next-level awesome… going to make micro-frontends development a dream”',
    name: 'Zack Jackson',
    description: 'Author of Module Federation',
    avatar: `${staticStorageUrl}/comment-carousel/ZackJackson@3x.png`
  },
  {
    content: '“Dreaming of an app design system powered by Watheia Labs and Figma…”',
    name: 'Lee Martin',
    description: 'Fullstack rock n’ roll devstar',
    avatar: `${staticStorageUrl}/comment-carousel/lee.png`
  },
  {
    content:
      '“In a few minutes we had a collection with a few components, imported them from Watheia Labs and they worked out of the box in our apps, so that is awesome…”',
    name: 'Diogo Silva',
    description: 'IPFS',
    avatar: `${staticStorageUrl}/comment-carousel/diogo.png`
  },
  {
    content: '“Today we are committed to using Watheia Labs in all our projects…”',
    name: 'Mike Kerr',
    description: 'Engineering manager at FabFitFun',
    avatar: `${staticStorageUrl}/comment-carousel/mike.png`
  },
  {
    content:
      "“I just saw a demo of how my current company's front-end team is using Watheia Labs to manage React components, and it's super-cool.”",
    name: 'C J Silverio',
    description: desc5(),
    avatar: `${staticStorageUrl}/comment-carousel/cj.png`
  }
];
