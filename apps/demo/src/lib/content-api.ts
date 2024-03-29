import { LocalContentApi } from '@watheia/content-api';
import { models } from '@watheia/content-model';

let api: LocalContentApi | null = null;

export async function withLocalContent() {
  if (api === null) {
    api = await LocalContentApi.create({
      rootPath: process.env['WORKSPACE_ROOT'] ?? process.cwd(),
      contentDirs: ['content/data', 'content/pages'],
      models: Object.values(models),
    });
  }

  return api;
}
