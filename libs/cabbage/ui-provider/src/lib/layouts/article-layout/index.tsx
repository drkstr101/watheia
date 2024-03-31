import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';

import { getBaseLayoutComponent } from '../../../lib/base-layout';
import Link from '../../atoms/Link';
import { getComponent } from '../../ui-provider';

export default function ArticleLayout(props) {
  const { page, site } = props;
  const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
  const { title, date, author, markdown_content, bottomSections = [] } = page;
  const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(date).format('MMMM D, YYYY');

  return (
    <BaseLayout page={page} site={site}>
      <main id="main" className="sb-layout sb-post-layout">
        <article className="px-4 py-16 sm:py-28">
          <div className="max-w-screen-2xl mx-auto">
            <header className="max-w-4xl mx-auto mb-12 text-center">
              <h1 data-sb-field-path="title">{title}</h1>
              <div className="text-sm uppercase mt-4">
                <time dateTime={dateTimeAttr} data-sb-field-path="date">
                  {formattedDate}
                </time>
                {author && (
                  <>
                    <span className="mx-2">|</span>
                    <PostAuthor author={author} />
                  </>
                )}
              </div>
            </header>
            {markdown_content && (
              <Markdown
                options={{ forceBlock: true }}
                className="sb-markdown max-w-3xl mx-auto"
                data-sb-field-path="content"
              >
                {markdown_content}
              </Markdown>
            )}
          </div>
        </article>
        {bottomSections.length > 0 && (
          <div data-sb-field-path="bottomSections">
            {bottomSections.map((section, index) => {
              const Component = getComponent(section.type);
              if (!Component) {
                throw new Error(
                  `no component matching the page section's model name: ${section.type}`
                );
              }
              return (
                <Component
                  key={index}
                  {...section}
                  data-sb-field-path={`bottomSections.${index}`}
                />
              );
            })}
          </div>
        )}
      </main>
    </BaseLayout>
  );
}

function PostAuthor({ author }) {
  const authorName = author.name && <span data-sb-field-path=".name">{author.name}</span>;
  return author.slug ? (
    <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
      {authorName}
    </Link>
  ) : (
    <span data-sb-field-path="author">{authorName}</span>
  );
}
