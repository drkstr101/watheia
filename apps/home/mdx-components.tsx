import { type MDXComponents as MDXComponentsType } from 'mdx/types';

import { MDXComponents } from '@watheia/studio-ui';

export function useMDXComponents(components: MDXComponentsType) {
  return {
    ...components,
    ...MDXComponents,
  };
}
