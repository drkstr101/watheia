import { getComponent } from '../components/components-registry';
import { withLocalContent } from '../lib/content-api';

export async function getStaticPaths() {
  const api = await withLocalContent();
  const paths = api.resolvePaths();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const api = await withLocalContent();
  const urlPath = '/' + (params.slug || []).join('/');
  const props = await api.resolveProps(urlPath);
  return { props };
}

export default function DynamicPage(props) {
  const { page, site } = props;
  if (!page.type) {
    throw new Error(`page has no type, page '${props.path}'`);
  }
  const Page = getComponent(page.type) as any;
  if (!Page) {
    throw new Error(`no page layout matching the page model: ${page.type}`);
  }
  return <Page page={page} site={site} />;
}
