import classNames from 'clsx';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { types } from '@watheia/content-model';
import { AnnotatedField } from '../../Annotated';
import { Action } from '../../atoms';
import { DynamicComponent } from '../../ui-provider';
import Section from '../Section';

export default function Component(props: types.HeroSection) {
  const {
    type,
    elementId,
    colors,
    backgroundSize,
    title,
    subtitle,
    text,
    media,
    actions = [],
    styles = {},
  } = props;
  const sectionFlexDirection = styles.self?.flexDirection ?? 'row';
  const sectionAlignItems = styles.self?.alignItems ?? 'center';
  return (
    <Section
      type={type}
      elementId={elementId}
      colors={colors}
      backgroundSize={backgroundSize}
      styles={styles.self}
    >
      <div
        className={classNames(
          'flex',
          mapFlexDirectionStyles(sectionFlexDirection),
          mapStyles({ alignItems: sectionAlignItems }),
          'space-y-8',
          {
            'lg:space-x-8 lg:space-y-0': sectionFlexDirection === 'row',
            'space-y-reverse lg:space-x-8 lg:space-y-0 lg:space-x-reverse':
              sectionFlexDirection === 'row-reverse',
            'space-y-reverse': sectionFlexDirection === 'col-reverse',
          }
        )}
      >
        <div className="w-full flex-1">
          <HeroBody {...props} />
          <HeroActions
            actions={actions}
            styles={styles.actions}
            hasTopMargin={!!(title || subtitle || text)}
          />
        </div>
        {media && (
          <div className="w-full flex-1">
            <HeroMedia media={media} />
          </div>
        )}
      </div>
    </Section>
  );
}

function HeroMedia({ media }) {
  return <DynamicComponent {...media} />;
}

/*
 This is the only component in this codebase which has a few Stackbit annotations for specific primitive
 field. These are added by the <AnnotatedField> helper.
 The motivation for these annotations: allowing the content editor to edit styles at the field level.
 */
function HeroBody(props: types.HeroSection) {
  const { title, subtitle, text, styles = {} } = props;
  return (
    <>
      {title && (
        <AnnotatedField path=".title">
          <h2 className={classNames('h1', styles.title ? mapStyles(styles.title) : null)}>
            {title}
          </h2>
        </AnnotatedField>
      )}
      {subtitle && (
        <AnnotatedField path=".subtitle">
          <p
            className={classNames(
              'text-xl',
              'sm:text-2xl',
              styles.subtitle ? mapStyles(styles.subtitle) : null,
              { 'mt-4': title }
            )}
          >
            {subtitle}
          </p>
        </AnnotatedField>
      )}
      {text && (
        <AnnotatedField path=".text">
          <Markdown
            options={{ forceBlock: true, forceWrapper: true }}
            className={classNames(
              'sb-markdown',
              'sm:text-lg',
              styles.text ? mapStyles(styles.text) : null,
              {
                'mt-6': title || subtitle,
              }
            )}
          >
            {text}
          </Markdown>
        </AnnotatedField>
      )}
    </>
  );
}

function HeroActions(props: {
  actions: (types.Button | types.Link)[];
  styles: any;
  hasTopMargin: boolean;
}) {
  const { actions = [], styles = {}, hasTopMargin } = props;
  if (actions.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('overflow-x-hidden', {
        'mt-8': hasTopMargin,
      })}
    >
      <div
        className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', mapStyles(styles))}
      >
        {actions.map((action, index) => (
          <Action key={index} {...action} className="mx-2 my-2 lg:whitespace-nowrap" />
        ))}
      </div>
    </div>
  );
}

function mapFlexDirectionStyles(flexDirection?: 'row' | 'row-reverse' | 'col' | 'col-reverse') {
  switch (flexDirection) {
    case 'row':
      return ['flex-col', 'lg:flex-row'];
    case 'row-reverse':
      return ['flex-col-reverse', 'lg:flex-row-reverse'];
    case 'col':
      return ['flex-col'];
    case 'col-reverse':
      return ['flex-col-reverse'];
    default:
      return null;
  }
}
