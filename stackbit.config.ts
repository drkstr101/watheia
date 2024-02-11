import { GitContentSource } from '@stackbit/cms-git';
import { defineStackbitConfig } from '@stackbit/types';

import model from './libs/content-model/src/index';

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'nextjs',
  buildCommand: 'nx run home:build:production',
  devCommand: 'nx run home:serve:development --port {PORT}',
  installCommand: 'yarn install',

  nodeVersion: '18',
  models: model,
  pagesDir: 'content/pages',
  dataDir: 'content/data',
  // pageLayoutKey: 'type',
  styleObjectModelName: 'Theme',

  presetSource: {
    type: 'files',
    presetDirs: ['content/presets'],
  },

  // assets: {
  //   referenceType: 'static',
  //   staticDir: 'apps/home/public',
  //   uploadDir: 'images',
  //   publicPath: '/',
  // },

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content/data', 'content/pages'],
      models: Object.values(model),
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'apps/home/public',
        uploadDir: 'images',
        publicPath: '/',
      },
    }),
  ],
});
