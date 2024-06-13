import { PageComponentProps, types } from '@watheia/content-model';
import { DynamicComponent } from '../../ui-provider';
import BaseLayout from '../BaseLayout';

type ComponentProps = PageComponentProps & types.PageLayout;

const Component: React.FC<ComponentProps> = (props) => {
  const { global, ...page } = props;
  const { title, sections = [] } = page;

  return (
    <BaseLayout {...props}>
      <main id="main" className="sb-layout sb-page-layout">
        {title && <h1 className="sr-only">{title}</h1>}
        {sections.length > 0 && (
          <div>
            {sections.map((section, index) => {
              return <DynamicComponent key={index} {...section} />;
            })}
          </div>
        )}
      </main>
    </BaseLayout>
  );
};
export default Component;
