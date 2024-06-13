import classNames from 'clsx';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import FormBlock from '../../molecules/FormBlock';
import { DynamicComponent } from '../../ui-provider';
import Section from '../Section';

export default function ContactSection(props) {
  const {
    type,
    elementId,
    colors,
    backgroundSize,
    title,
    text,
    form,
    media,
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
          <ContactBody title={title} text={text} styles={styles} />
          {form && (
            <div className={classNames('sb-contact-section-form', { 'mt-12': title || text })}>
              <FormBlock {...form} className="inline-block w-full" />
            </div>
          )}
        </div>
        {media && (
          <div className="w-full flex-1">
            <ContactMedia media={media} />
          </div>
        )}
      </div>
    </Section>
  );
}

function ContactMedia({ media }) {
  return <DynamicComponent {...media} />;
}

function ContactBody(props) {
  return (
    <>
      {props.title && (
        <h2 className={classNames(props.styles?.title ? mapStyles(props.styles?.title) : null)}>
          {props.title}
        </h2>
      )}
      {props.text && (
        <Markdown
          options={{ forceBlock: true, forceWrapper: true }}
          className={classNames(
            'sb-markdown',
            props.styles?.text ? mapStyles(props.styles?.text) : null,
            { 'mt-4': props.title }
          )}
        >
          {props.text}
        </Markdown>
      )}
    </>
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
