import { resolveContent, resolveStaticPaths, resolveStaticProps } from '@watheia/content-api';

import { getComponent } from '../components/components-registry';

export function getStaticPaths() {
  const data = resolveContent();
  const paths = resolveStaticPaths(data);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = resolveContent();
  const urlPath = '/' + (params.slug || []).join('/');
  const props = await resolveStaticProps(urlPath, data);
  return { props };
}

export default function DynamicPage(props) {
  const { page, site } = props;
  const { modelName } = page.__metadata;
  if (!modelName) {
    throw new Error(`page has no type, page '${props.path}'`);
  }
  const Page = getComponent(modelName) as any;
  if (!Page) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <Page page={page} site={site} />;
}
