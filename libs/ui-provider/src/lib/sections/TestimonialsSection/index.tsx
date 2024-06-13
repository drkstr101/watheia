import classNames from 'clsx';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import ImageBlock from '../../molecules/ImageBlock';
import Section from '../Section';

export default function TestimonialsSection(props) {
  const { type, elementId, colors, variant, title, subtitle, testimonials, styles = {} } = props;
  return (
    <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
      {title && (
        <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h2>
      )}
      {subtitle && (
        <p
          className={classNames(
            'text-lg',
            'sm:text-xl',
            styles.subtitle ? mapStyles(styles.subtitle) : null,
            { 'mt-6': title }
          )}
        >
          {subtitle}
        </p>
      )}
      <TestimonialVariants
        variant={variant}
        testimonials={testimonials}
        hasTopMargin={!!(title || subtitle)}
      />
    </Section>
  );
}

function TestimonialVariants(props) {
  const { variant = 'variant-a', ...rest } = props;
  switch (variant) {
    case 'variant-a':
      return <TestimonialsVariantA {...rest} />;
    case 'variant-b':
      return <TestimonialsVariantB {...rest} />;
    case 'variant-c':
      return <TestimonialsVariantC {...rest} />;
    default:
      return null;
  }
}

function TestimonialsVariantA(props) {
  const { testimonials = [], hasTopMargin } = props;
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('grid', 'md:grid-cols-2', 'gap-y-16', 'md:gap-y-20', {
        'mt-16 sm:mt-20': hasTopMargin,
      })}
    >
      {testimonials.map((testimonial, index) => (
        <blockquote
          key={index}
          className={classNames(index % 2 === 0 ? 'md:pr-12' : 'md:border-l md:pl-12')}
        >
          {testimonial.image && (
            <div className="mb-8">
              <ImageBlock
                {...testimonial.image}
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
          )}
          {testimonial.quote && (
            <Markdown
              options={{ forceBlock: true, forceWrapper: true }}
              className="sb-markdown text-3xl sm:text-4xl sm:leading-tight"
            >
              {testimonial.quote}
            </Markdown>
          )}
          {(testimonial.name || testimonial.title) && (
            <footer className="mt-8 md:mt-12">
              {testimonial.name && (
                <div
                  className={classNames(
                    'text-lg',
                    testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null
                  )}
                >
                  {testimonial.name}
                </div>
              )}
              {testimonial.title && (
                <div
                  className={classNames(
                    'text-lg',
                    testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null
                  )}
                >
                  {testimonial.title}
                </div>
              )}
            </footer>
          )}
        </blockquote>
      ))}
    </div>
  );
}

function TestimonialsVariantB(props) {
  const { testimonials = [], hasTopMargin } = props;
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('space-y-16', 'sm:space-y-24', { 'mt-16 sm:mt-20': hasTopMargin })}
    >
      {testimonials.map((testimonial, index) => (
        <blockquote key={index}>
          {testimonial.quote && (
            <Markdown
              options={{ forceBlock: true, forceWrapper: true }}
              className="sb-markdown text-3xl sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
            >
              {testimonial.quote}
            </Markdown>
          )}
          {(testimonial.name || testimonial.title || testimonial.image) && (
            <footer className="mt-6 flex flex-wrap items-center md:mt-8">
              {testimonial.image && (
                <div className="mr-6 mt-4 shrink-0">
                  <ImageBlock
                    {...testimonial.image}
                    className="h-12 w-12 rounded-full object-cover sm:h-20 sm:w-20"
                  />
                </div>
              )}
              {(testimonial.name || testimonial.title) && (
                <div className="mt-4 grow">
                  {testimonial.name && (
                    <div
                      className={classNames(
                        'text-lg',
                        testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null
                      )}
                    >
                      {testimonial.name}
                    </div>
                  )}
                  {testimonial.title && (
                    <div
                      className={classNames(
                        'text-lg',
                        testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null
                      )}
                    >
                      {testimonial.title}
                    </div>
                  )}
                </div>
              )}
            </footer>
          )}
        </blockquote>
      ))}
    </div>
  );
}

function TestimonialsVariantC(props) {
  const { testimonials = [], hasTopMargin } = props;
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('space-y-16', 'sm:space-y-24', { 'mt-16 sm:mt-20': hasTopMargin })}
    >
      {testimonials.map((testimonial, index) => (
        <blockquote
          key={index}
          className={classNames(
            'flex',
            'flex-col',
            'md:items-center',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          )}
        >
          {testimonial.image && (
            <div
              className={classNames(
                'shrink-0',
                'max-w-lg',
                'mb-8',
                'md:mb-0',
                'md:w-2/5',
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              )}
            >
              <ImageBlock {...testimonial.image} className="w-full" />
            </div>
          )}
          <div className="grow">
            {testimonial.quote && (
              <Markdown
                options={{ forceBlock: true, forceWrapper: true }}
                className="sb-markdown text-3xl sm:text-4xl sm:leading-tight"
              >
                {testimonial.quote}
              </Markdown>
            )}
            {(testimonial.name || testimonial.title) && (
              <footer className="mt-6 flex flex-wrap items-center md:mt-8">
                {(testimonial.name || testimonial.title) && (
                  <div className="mt-4 grow">
                    {testimonial.name && (
                      <div
                        className={classNames(
                          'text-lg',
                          testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null
                        )}
                      >
                        {testimonial.name}
                      </div>
                    )}
                    {testimonial.title && (
                      <div
                        className={classNames(
                          'text-lg',
                          testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null
                        )}
                      >
                        {testimonial.title}
                      </div>
                    )}
                  </div>
                )}
              </footer>
            )}
          </div>
        </blockquote>
      ))}
    </div>
  );
}
