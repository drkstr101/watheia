import { type MDXComponents as MDXComponentsType } from 'mdx/types';

import { MDXComponents } from '@watheia/base-ui';

export function useMDXComponents(components: MDXComponentsType) {
  return {
    ...components,
    ...MDXComponents,
  };
}
