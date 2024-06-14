import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import classNames from 'clsx';
import Markdown from 'markdown-to-jsx';

import Action from '../../../atoms/Action';
import ImageBlock from '../../../molecules/ImageBlock';

export default function FeaturedItem(props) {
  const { elementId, title, subtitle, text, featuredImage, actions = [], styles = {} } = props;
  const { self = {} } = styles;
  const { borderWidth, ...otherSelfStyles } = self;
  return (
    <article
      id={elementId || null}
      className={classNames('wa-component', 'wa-block', 'wa-item', mapStyles(otherSelfStyles))}
      style={{
        borderWidth: borderWidth ? `${borderWidth}px` : undefined,
      }}
    >
      {featuredImage && (
        <div className="mb-6">
          <ImageBlock {...featuredImage} className="inline-block" />
        </div>
      )}
      {title && (
        <h3 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h3>
      )}
      {subtitle && (
        <p
          className={classNames('text-lg', styles.subtitle ? mapStyles(styles.subtitle) : null, {
            'mt-1': title,
          })}
        >
          {subtitle}
        </p>
      )}
      {text && (
        <Markdown
          options={{ forceBlock: true, forceWrapper: true }}
          className={classNames('wa-markdown', {
            'mt-4': title || subtitle,
          })}
        >
          {text}
        </Markdown>
      )}
      <ItemActions
        actions={actions}
        textAlign={otherSelfStyles.textAlign}
        hasTopMargin={!!(title || subtitle || text)}
      />
    </article>
  );
}

function ItemActions(props) {
  const { actions = [], textAlign, hasTopMargin } = props;
  if (actions.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('overflow-x-hidden', {
        'mt-4': hasTopMargin,
      })}
    >
      <div
        className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', {
          'justify-center': textAlign === 'center',
          'justify-end': textAlign === 'right',
        })}
      >
        {actions.map((action, index) => (
          <Action key={index} {...action} className="mx-2 my-2 lg:whitespace-nowrap" />
        ))}
      </div>
    </div>
  );
}
