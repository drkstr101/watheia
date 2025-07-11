import classNames from 'classnames';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import * as React from 'react';

import { DynamicComponent } from '@/components/components-registry';
import { PageComponentProps, PostLayout } from '@/types';
import HighlightedPreBlock from '@/utils/highlighted-markdown';
import BaseLayout from '../BaseLayout';

type ComponentProps = PageComponentProps & PostLayout;

const Component: React.FC<ComponentProps> = (props) => {
  const { title, date, author, markdownContent, media, bottomSections = [] } = props;
  const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  return (
    <BaseLayout {...props}>
      <article className="px-4 py-14 lg:py-20">
        <header className="mx-auto mb-10 max-w-5xl sm:mb-14">
          <div className="mb-6 uppercase">
            <time dateTime={dateTimeAttr}>{formattedDate}</time>
            {author && (
              <>
                {' | '}
                {author.firstName} {author.lastName}
              </>
            )}
          </div>
          <h1 className="text-5xl sm:text-6xl">{title}</h1>
        </header>
        {media && (
          <figure className="mx-auto mb-10 max-w-5xl sm:mb-14">
            <PostMedia media={media} />
          </figure>
        )}
        {markdownContent && (
          <Markdown
            options={{ forceBlock: true, overrides: { pre: HighlightedPreBlock } }}
            className="prose sm:prose-lg mx-auto max-w-3xl"
          >
            {markdownContent}
          </Markdown>
        )}
      </article>
      {bottomSections?.map((section, index) => {
        return <DynamicComponent key={index} {...section} />;
      })}
    </BaseLayout>
  );
};
export default Component;

function PostMedia({ media }) {
  return (
    <DynamicComponent
      {...media}
      className={classNames({ 'w-full': media.type === 'ImageBlock' })}
    />
  );
}
