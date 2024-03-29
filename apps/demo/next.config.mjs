//@ts-check

import { composePlugins, withNx } from '@nx/next';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const LOCAL_CONTENT_DIR = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: { LOCAL_CONTENT_DIR },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default composePlugins(...plugins)(nextConfig);
