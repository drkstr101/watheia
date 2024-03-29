import BlankBaseLayout from '../components/layouts/BlankBaseLayout';
import DefaultBaseLayout from '../components/layouts/DefaultBaseLayout';

export function getBaseLayoutComponent(pageBaseLayout: any, siteConfigBaseLayout: any) {
  const layout = pageBaseLayout || siteConfigBaseLayout || 'DefaultBaseLayout';
  let BaseLayout;
  if (layout === 'DefaultBaseLayout') {
    BaseLayout = DefaultBaseLayout;
  } else if (layout === 'BlankBaseLayout') {
    BaseLayout = BlankBaseLayout;
  } else {
    BaseLayout = DefaultBaseLayout;
  }
  if (!BaseLayout) {
    throw new Error(`no BaseLayout: ${pageBaseLayout} or ${siteConfigBaseLayout}`);
  }
  return BaseLayout;
}
