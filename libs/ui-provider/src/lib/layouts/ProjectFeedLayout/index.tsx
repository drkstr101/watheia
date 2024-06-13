import classNames from 'clsx';
import * as React from 'react';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { PageComponentProps, types } from '@watheia/content-model';
import ProjectFeedSection from '../../sections/ProjectFeedSection';
import { DynamicComponent } from '../../ui-provider';
import BaseLayout from '../BaseLayout';

type ComponentProps = PageComponentProps &
  types.ProjectFeedLayout & { items: types.ProjectLayout[] };

const Component: React.FC<ComponentProps> = (props) => {
  const { global, ...page } = props;
  const { title, topSections = [], bottomSections = [], items, projectFeed, styles = {} } = page;

  return (
    <BaseLayout {...props}>
      <main id="main" className="layout page-layout">
        {title && (
          <div
            className={classNames(
              'flex',
              'py-12',
              'lg:py-16',
              'px-4',
              mapStyles({ justifyContent: projectFeed?.styles?.self?.justifyContent ?? 'center' })
            )}
          >
            <h1
              className={classNames(
                'w-full',
                mapStyles({ width: projectFeed?.styles?.self?.width ?? 'wide' }),
                styles?.title ? mapStyles(styles?.title) : null
              )}
            >
              {title}
            </h1>
          </div>
        )}
        <Sections sections={topSections} />
        <ProjectFeedSection {...projectFeed} projects={items} />
        <Sections sections={bottomSections} />
      </main>
    </BaseLayout>
  );
};
export default Component;

function Sections({ sections }) {
  if (sections.length === 0) {
    return null;
  }
  return (
    <div>
      {sections.map((section, index) => {
        return <DynamicComponent key={index} {...section} />;
      })}
    </div>
  );
}
