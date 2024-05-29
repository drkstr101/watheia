import { DynamicComponent } from '@watheia/ui-provider';

import { getContentApi } from '../../lib/content-api';

type Props = { params: { slug?: string[] } };

export async function generateStaticParams() {
  return [{ slug: [] }, { slug: ['about'] }];
}

export default async function Page({ params }: Props) {
  const urlPath = '/' + (params.slug || []).join('/');
  const api = await getContentApi();
  const data = api.getProps(urlPath);

  console.log(data);

  /*
   * Renders a dynamic data-driven page component from data
   */
  return <DynamicComponent {...data} />;
}
