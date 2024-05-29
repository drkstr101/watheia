import { Button, Container } from '@watheia/base-ui';

import { FadeIn } from './FadeIn';
import { Offices } from './Offices';

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="rounded-4xl -mx-6 bg-black px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              We would love to hear from you
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact" color="white">
                Get in touch
              </Button>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">Our offices</h3>
              <Offices invert className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
