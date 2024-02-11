//@ts-check

import rehypeShiki from '@leafac/rehype-shiki';
import nextMDX from '@next/mdx';
import { composePlugins, withNx } from '@nx/next';
import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import escapeStringRegexp from 'escape-string-regexp';
import { resolve } from 'path';
import { recmaImportImages } from 'recma-import-images';
import remarkGfm from 'remark-gfm';
import { remarkRehypeWrap } from 'remark-rehype-wrap';
import remarkUnwrapImages from 'remark-unwrap-images';
import shiki from 'shiki';
import { unifiedConditional } from 'unified-conditional';
import { fileURLToPath } from 'url';

const WORKSPACE_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  env: { WORKSPACE_ROOT },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

/**
 * @param {any} source
 * @param {any} metaName
 */
function remarkMDXLayout(source, metaName) {
  const parser = Parser.extend(jsx());
  /**
   * @type {import('acorn').Options}
   **/
  const parseOptions = { ecmaVersion: 'latest', sourceType: 'module' };

  return (
    /** @type {{ children: { type: string; value: string; data: { estree: import("acorn").Program; }; }[]; }} */ tree
  ) => {
    const imp = `import _Layout from '${source}'`;
    const exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`;

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      }
    );
  };
}

/**
 * @param {string} phase
 * @param {any} context
 */
export default async function config(phase, context) {
  const highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  });

  const withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        // @ts-expect-error
        [rehypeShiki, { highlighter }],
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkUnwrapImages,
        [
          unifiedConditional,
          [
            new RegExp(`^${escapeStringRegexp(resolve('app/blog'))}`),
            [[remarkMDXLayout, '@home/app/blog/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(resolve('app/work'))}`),
            [[remarkMDXLayout, '@home/app/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  });

  const composedPlugins = composePlugins(withNx, withMDX);
  const transformer = composedPlugins(nextConfig);
  return transformer(phase, context);
}
