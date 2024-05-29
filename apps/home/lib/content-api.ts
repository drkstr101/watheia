import { LocalContentApi } from '@watheia/content-api';
import { config } from '@watheia/content-helpers';
import { models } from '@watheia/content-model';

let api: LocalContentApi | null = null;

export async function getContentApi(): Promise<LocalContentApi> {
  if (api == null) {
    api = await LocalContentApi.resolve({
      rootPath: config.workspaceRoot,
      contentDirs: config.contentDirs,
      models: Object.values(models),
    });
  }

  return api;
}
