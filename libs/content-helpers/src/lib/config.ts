export const isDev = process.env['NODE_ENV'] === 'development';

export const supportedFileTypes = ['md', 'json'];

// export const workspaceRoot = process.env['WORKSPACE_ROOT'] ?? process.cwd();

export const contentDirs = ['content/data', 'content/pages'];

export const dataModels = ['Config', 'Person', 'ThemeStyle'];

export const pageModels = [
  'PageLayout',
  'PostFeedLayout',
  'PostLayout',
  'ProjectFeedLayout',
  'ProjectLayout',
];
