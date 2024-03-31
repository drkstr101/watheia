import { LocalContentApi, LocalContentSchema } from '@watheia/content-api';
import { models } from '@watheia/content-model';

let api: LocalContentApi | null = null;

export const defaultSchema: LocalContentSchema = {
  rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
  contentDirs: ['content/data', 'content/pages'],
  models: Object.values(models),
};

export async function withLocalContent() {
  if (api === null) {
    api = await LocalContentApi.create(defaultSchema);
  }

  return api;
}
