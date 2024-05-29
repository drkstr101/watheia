import classNames from 'clsx';
import dayjs from 'dayjs';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { Action, Link } from '../../atoms';
import ImageBlock from '../../molecules/ImageBlock';
import ArrowUpRightIcon from '../../svgs/arrow-up-right';
import Section from '../Section';

export default function PostFeedSection(props) {
  const {
    type,
    elementId,
    colors,
    variant,
    title,
    subtitle,
    actions = [],
    posts = [],
    showDate,
    showAuthor,
    showExcerpt,
    showFeaturedImage,
    showReadMoreLink,
    styles = {},
  } = props;
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
      <PostFeedVariants
        variant={variant}
        posts={posts}
        showDate={showDate}
        showAuthor={showAuthor}
        showExcerpt={showExcerpt}
        showFeaturedImage={showFeaturedImage}
        showReadMoreLink={showReadMoreLink}
        hasTopMargin={!!(title || subtitle)}
      />
      <PostFeedActions actions={actions} styles={styles.actions} />
    </Section>
  );
}

function PostFeedActions(props) {
  const { actions = [], styles = {} } = props;
  if (actions.length === 0) {
    return null;
  }
  return (
    <div className="mt-10 overflow-x-hidden">
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

function PostFeedVariants(props) {
  const { variant = 'variant-a' } = props;
  switch (variant) {
    case 'variant-a':
    case 'variant-b':
    case 'variant-c':
      return <PostsVariantABC {...props} />;
    case 'variant-d':
      return <PostsVariantD {...props} />;
    default:
      return null;
  }
}

function PostsVariantABC(props) {
  const {
    variant = 'variant-a',
    posts = [],
    showDate,
    showAuthor,
    showExcerpt,
    showFeaturedImage,
    showReadMoreLink,
    hasTopMargin,
  } = props;
  if (posts.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('grid', 'gap-y-12', {
        'md:grid-cols-2': variant === 'variant-a',
        'md:grid-cols-3': variant === 'variant-b',
        'justify-center': variant === 'variant-c',
        'gap-x-6 lg:gap-x-8': variant === 'variant-a' || 'variant-b',
        'mt-12': hasTopMargin,
      })}
    >
      {posts.map((post, index) => (
        <Link key={index} href={post} className="sb-post-feed-item group block">
          <article className="max-w-3xl border-b border-current pb-10">
            {showFeaturedImage && post.featuredImage && (
              <div className="pt-2/3 relative mb-6 h-0 w-full overflow-hidden">
                <ImageBlock
                  {...post.featuredImage}
                  className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <h3>{post.title}</h3>
            {showExcerpt && post.excerpt && <p className="mt-5 text-lg">{post.excerpt}</p>}
            {showReadMoreLink && (
              <div className="mt-8">
                <span className="sb-component sb-component-block sb-component-button sb-component-button-secondary sb-component-button-icon">
                  <span className="sr-only">Read more</span>
                  <ArrowUpRightIcon className="h-5 w-5 fill-current" />
                </span>
              </div>
            )}
          </article>
        </Link>
      ))}
    </div>
  );
}

function PostsVariantD(props) {
  const {
    posts = [],
    showDate,
    showAuthor,
    showExcerpt,
    showFeaturedImage,
    showReadMoreLink,
    hasTopMargin,
  } = props;
  if (posts.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('grid', 'gap-y-12', {
        'mt-12': hasTopMargin,
      })}
    >
      {posts.map((post, index) => (
        <Link key={index} href={post} className="sb-post-feed-item group block">
          <article className="border-b border-current pb-10 md:px-4 md:pb-12">
            <div className="md:flex md:items-center">
              {showFeaturedImage && post.featuredImage && (
                <div className="mb-8 md:mb-0 md:mr-8 md:w-48 md:shrink-0 md:self-stretch">
                  <div className="pt-2/3 relative h-0 w-full overflow-hidden md:h-24 md:min-h-full md:pt-0">
                    <ImageBlock
                      {...post.featuredImage}
                      className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}
              <div
                className={classNames(
                  'md:grow',
                  showFeaturedImage && post.featuredImage ? null : 'md:ml-12'
                )}
              >
                <PostAttribution
                  showDate={showDate}
                  showAuthor={showAuthor}
                  date={post.date}
                  author={post.author}
                  className="mb-3"
                />
                <h3>{post.title}</h3>
                {showExcerpt && post.excerpt && <p className="mt-5 text-lg">{post.excerpt}</p>}
              </div>
              {showReadMoreLink && (
                <div className="mt-8 md:mx-8 md:mt-0">
                  <span className="sb-component sb-component-block sb-component-button sb-component-button-secondary sb-component-button-icon">
                    <span className="sr-only">Read more</span>
                    <ArrowUpRightIcon className="h-5 w-5 fill-current md:h-8 md:w-8" />
                  </span>
                </div>
              )}
            </div>
          </article>
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
          {dayjs(date).format('MM-DD-YYYY')}
        </time>
      )}
      {showAuthor && author && (
        <>
          {showDate && ' | '}
          <span>
            {author.firstName && <span>{author.firstName}</span>}{' '}
            {author.lastName && <span>{author.lastName}</span>}
          </span>
        </>
      )}
    </div>
  );
}
