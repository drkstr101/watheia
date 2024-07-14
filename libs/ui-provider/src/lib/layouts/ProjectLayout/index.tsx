import classNames from 'clsx';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import * as React from 'react';

import { PageComponentProps, types } from '@watheia/content-model';
import { Annotated } from '../../Annotated';
import HighlightedPreBlock from '../../HighlightedMarkdown';
import Link from '../../atoms/Link';
import ImageBlock from '../../molecules/ImageBlock';
import { DynamicComponent } from '../../ui-provider';
import BaseLayout from '../BaseLayout';

type ComponentProps = PageComponentProps &
  types.ProjectLayout & {
    prevProject?: types.ProjectLayout;
    nextProject?: types.ProjectLayout;
  };

const Component: React.FC<ComponentProps> = (props) => {
  const { global, ...page } = props;
  const {
    title,
    date,
    client,
    description,
    markdownContent,
    media,
    prevProject,
    nextProject,
    bottomSections = [],
  } = page;
  const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  const formattedDate = dayjs(date).format('MM-DD-YYYY');

  return (
    <BaseLayout {...props}>
      <main id="main" className="wa-layout sb-project-layout">
        <article className="px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 sm:mb-16">
              {client && <div className="mb-2 text-lg uppercase md:mb-6">{client}</div>}
              <div className="md:flex md:justify-between">
                <div className="mb-6 text-lg md:order-last md:mb-0 md:ml-12">
                  <time dateTime={dateTimeAttr}>{formattedDate}</time>
                </div>
                <h1 className="md:max-w-2xl md:flex-grow">{title}</h1>
              </div>
            </header>
            {description && (
              <div className="mx-auto mb-10 max-w-screen-md text-xl uppercase leading-normal sm:mb-16">
                {description}
              </div>
            )}
            {media && (
              <div className="mb-10 sm:mb-16">
                <ProjectMedia media={media} />
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
        {(prevProject || nextProject) && (
          <nav className="wa-project-nav mb-20 mt-12 px-4 sm:px-8">
            <div className="mx-auto grid max-w-5xl gap-x-6 gap-y-12 md:grid-cols-2 lg:gap-x-8">
              {prevProject && <ProjectNavItem project={prevProject} label="Previous project" />}
              {nextProject && <ProjectNavItem project={nextProject} label="Next project" />}
            </div>
          </nav>
        )}
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

function ProjectMedia({ media }) {
  return (
    <DynamicComponent
      {...media}
      className={classNames({ 'w-full': media.type === 'ImageBlock' })}
    />
  );
}

function ProjectNavItem({ project, label }) {
  return (
    <Annotated content={project}>
      <Link className="wa-project-nav-item group" href={project}>
        {project.featuredImage && (
          <div className="pt-2/3 relative mb-6 h-0 w-full overflow-hidden">
            <ImageBlock
              {...project.featuredImage}
              className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <span className="wa-component wa-block wa-link">{label}</span>
      </Link>
    </Annotated>
  );
}
