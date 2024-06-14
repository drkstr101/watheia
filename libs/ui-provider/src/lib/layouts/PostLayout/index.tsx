import { PageComponentProps, types } from '@watheia/content-model';
import classNames from 'clsx';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';

import HighlightedPreBlock from '../../HighlightedMarkdown';
import { DynamicComponent } from '../../ui-provider';
import BaseLayout from '../BaseLayout';

type ComponentProps = PageComponentProps & types.PostLayout;

const Component: React.FC<ComponentProps> = (props) => {
  const { global, ...page } = props;
  const { title, date, author, markdownContent, media, bottomSections = [] } = page;
  const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(date).format('MM-DD-YYYY');

  return (
    <BaseLayout {...props}>
      <main id="main" className="wa-layout sb-post-layout">
        <article className="px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 sm:mb-14">
              <div className="mb-4 uppercase sm:mb-6">
                <time dateTime={dateTimeAttr}>{formattedDate}</time>
                {author && (
                  <>
                    {' | '}
                    <PostAuthor author={author} />
                  </>
                )}
              </div>
              <h1>{title}</h1>
            </header>
            {media && (
              <div className="mb-10 sm:mb-14">
                <PostMedia media={media} />
              </div>
            )}
            {markdownContent && (
              <Markdown
                options={{ forceBlock: true, overrides: { pre: HighlightedPreBlock } }}
                className="wa-markdown mx-auto max-w-screen-md"
              >
                {markdownContent}
              </Markdown>
            )}
          </div>
        </article>
        {bottomSections.length > 0 && (
          <div>
            {bottomSections.map((section, index) => {
              return <DynamicComponent key={index} {...section} />;
            })}
          </div>
        )}
      </main>
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

function PostAuthor({ author }) {
  return (
    <span>
      {author.firstName && <span>{author.firstName}</span>}{' '}
      {author.lastName && <span>{author.lastName}</span>}
    </span>
  );
}
