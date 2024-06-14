import classNames from 'clsx';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import Section from '../Section';

export default function QuoteSection(props) {
  const { type, elementId, colors, quote, name, title, styles = {} } = props;
  return (
    <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
      <blockquote>
        {quote && (
          <Markdown
            options={{ forceBlock: true, forceWrapper: true }}
            className={classNames(
              'wa-markdown',
              'text-3xl',
              'sm:text-5xl',
              'sm:leading-tight',
              styles.quote ? mapStyles(styles.quote) : null
            )}
          >
            {quote}
          </Markdown>
        )}
        {(name || title) && (
          <footer className="mt-8 sm:mt-10">
            {name && (
              <span
                className={classNames(
                  'block',
                  'text-lg',
                  'sm:text-xl',
                  styles.name ? mapStyles(styles.name) : null
                )}
              >
                {name}
              </span>
            )}
            {title && (
              <span
                className={classNames(
                  'block',
                  'text-lg',
                  'sm:text-xl',
                  styles.title ? mapStyles(styles.title) : null
                )}
              >
                {title}
              </span>
            )}
          </footer>
        )}
      </blockquote>
    </Section>
  );
}
