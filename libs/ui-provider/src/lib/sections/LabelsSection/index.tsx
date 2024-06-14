import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import classNames from 'clsx';

import { Annotated } from '../../Annotated';
import { Link } from '../../atoms';
import Section from '../Section';

export default function LabelsSection(props) {
  const { type, elementId, colors, title, subtitle, items = [], styles = {} } = props;
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
            {
              'mt-6': title,
            }
          )}
        >
          {subtitle}
        </p>
      )}
      {items.length > 0 && (
        <div
          className={classNames('flex', 'flex-wrap', {
            'mt-12 lg:mt-16': title || subtitle,
          })}
        >
          {items.map((item, index) => (
            <LabelItem key={index} {...item} />
          ))}
        </div>
      )}
    </Section>
  );
}

function LabelItem(props) {
  const { label, url } = props;
  if (!label) {
    return null;
  }
  return (
    <Annotated content={props}>
      {url ? (
        <Link
          href={url}
          className="wa-component wa-block wa-button wa-button-secondary mb-6 mr-6"
        >
          <span>{label}</span>
        </Link>
      ) : (
        <div className="wa-component wa-block wa-button wa-button-secondary wa-button-no-hover mb-6 mr-6">
          <span>{label}</span>
        </div>
      )}
    </Annotated>
  );
}
