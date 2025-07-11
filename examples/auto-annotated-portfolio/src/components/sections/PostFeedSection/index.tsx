import classNames from 'classnames';
import dayjs from 'dayjs';

import { Action, Link } from '@/components/atoms';
import ImageBlock from '@/components/molecules/ImageBlock';
import ArrowUpRightIcon from '@/components/svgs/arrow-up-right';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import Section from '../Section';

export default function PostFeedSection(props) {
  const {
    elementId,
    colors,
    variant = 'variant-a',
    title,
    subtitle,
    actions = [],
    styles = {},
    ...rest
  } = props;
  const sectionAlign = styles.self?.textAlign ?? 'left';
  return (
    <Section elementId={elementId} colors={colors} styles={styles.self}>
      {title && (
        <h2
          className={classNames('text-4xl sm:text-5xl', mapStyles({ textAlign: sectionAlign }))}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={classNames('text-lg sm:text-xl', mapStyles({ textAlign: sectionAlign }), {
            'mt-6': title,
          })}
        >
          {subtitle}
        </p>
      )}
      {variant === 'variant-d' ? (
        <PostList
          {...rest}
          hasTopMargin={!!(title || subtitle)}
          headingLevel={title ? 'h3' : 'h2'}
        />
      ) : (
        <PostGrid
          {...rest}
          variant={variant}
          hasTopMargin={!!(title || subtitle)}
          headingLevel={title ? 'h3' : 'h2'}
        />
      )}
      {actions?.length > 0 && (
        <div
          className={classNames(
            'mt-10 flex flex-wrap items-center gap-4',
            sectionAlign === 'center' ? 'justify-center' : 'justify-end',
          )}
        >
          {actions.map((action, index) => (
            <Action key={index} {...action} />
          ))}
        </div>
      )}
    </Section>
  );
}

function PostGrid(props) {
  const {
    variant,
    posts = [],
    showDate,
    showAuthor,
    showExcerpt,
    showFeaturedImage,
    showReadMoreLink,
    hasTopMargin,
    headingLevel,
  } = props;
  if (posts.length === 0) {
    return null;
  }
  const TitleTag = headingLevel;
  return (
    <div
      className={classNames('grid gap-y-12', {
        'md:grid-cols-2': variant === 'variant-a',
        'md:grid-cols-3': variant === 'variant-b',
        'justify-center': variant === 'variant-c',
        'gap-x-6 lg:gap-x-8': variant !== 'variant-c',
        'mt-12': hasTopMargin,
      })}
    >
      {posts.map((post, index) => (
        <Link
          key={index}
          href={post}
          className="group block max-w-3xl border-b border-current pb-10"
        >
          {showFeaturedImage && post.featuredImage && (
            <div className="mb-6 aspect-3/2 w-full overflow-hidden">
              <ImageBlock
                {...post.featuredImage}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <PostAttribution
            showDate={showDate}
            showAuthor={showAuthor}
            date={post.date}
            author={post.author}
            className="mb-3"
          />
          <TitleTag className="text-3xl sm:text-4xl">{post.title}</TitleTag>
          {showExcerpt && post.excerpt && <p className="mt-5 text-lg">{post.excerpt}</p>}
          {showReadMoreLink && (
            <div className="mt-8">
              <span className="group-hover:bottom-shadow-6 inline-flex rounded-full border-2 border-current p-4 text-xl transition group-hover:-translate-y-1.5">
                <ArrowUpRightIcon className="w-icon h-icon fill-current" />
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

function PostList(props) {
  const {
    posts = [],
    showDate,
    showAuthor,
    showExcerpt,
    showFeaturedImage,
    showReadMoreLink,
    hasTopMargin,
    headingLevel,
  } = props;
  if (posts.length === 0) {
    return null;
  }
  const TitleTag = headingLevel;
  return (
    <div
      className={classNames('grid gap-y-12', {
        'mt-12': hasTopMargin,
      })}
    >
      {posts.map((post, index) => (
        <Link
          key={index}
          href={post}
          className="group block border-b border-current pb-10 md:px-4 md:pb-12"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {showFeaturedImage && post.featuredImage && (
              <div className="md:w-48 md:shrink-0 md:self-stretch">
                <div className="aspect-3/2 w-full overflow-hidden md:min-h-full">
                  <ImageBlock
                    {...post.featuredImage}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            )}
            <div className="md:grow">
              <PostAttribution
                showDate={showDate}
                showAuthor={showAuthor}
                date={post.date}
                author={post.author}
                className="mb-3"
              />
              <TitleTag className="text-3xl sm:text-4xl">{post.title}</TitleTag>
              {showExcerpt && post.excerpt && <p className="mt-5 text-lg">{post.excerpt}</p>}
            </div>
            {showReadMoreLink && (
              <div className="md:mx-4">
                <span className="group-hover:bottom-shadow-6 inline-flex rounded-full border-2 border-current p-4 text-xl transition group-hover:-translate-y-1.5 md:text-3xl">
                  <ArrowUpRightIcon className="w-icon h-icon fill-current" />
                </span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function PostAttribution({ showDate, showAuthor, date, author, className = '' }) {
  if (!showDate && !(showAuthor && author)) {
    return null;
  }
  return (
    <div className={className}>
      {showDate && (
        <time dateTime={dayjs(date).format('YYYY-MM-DD HH:mm:ss')}>
          {dayjs(date).format('YYYY-MM-DD')}
        </time>
      )}
      {showAuthor && author && (
        <>
          {showDate && ' | '}
          {author.firstName} {author.lastName}
        </>
      )}
    </div>
  );
}
