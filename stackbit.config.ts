import { GitContentSource } from '@stackbit/cms-git';
import { defineStackbitConfig } from '@stackbit/types';

import { models } from './libs/content-model/src/index';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  buildCommand: 'nx run demo:build:production',
  devCommand: 'nx run demo:serve:development --port {PORT}',
  installCommand: 'yarn install',

  nodeVersion: '18',
  models,
  pagesDir: 'content/pages',
  dataDir: 'content/data',
  pageLayoutKey: 'type',
  styleObjectModelName: 'ThemeStyle',

  presetSource: {
    type: 'files',
    presetDirs: ['content/presets'],
  },

  assets: {
    referenceType: 'static',
    staticDir: 'content/assets',
    uploadDir: 'images',
    publicPath: '/',
  },

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content/data', 'content/pages'],
      models: Object.values(models),
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'content/assets',
        uploadDir: 'images',
        publicPath: '/',
      },
    }),
  ],
});
