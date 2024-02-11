import { LocalContentApi } from '@watheia/content-api';

// const api = new LocalContentApi().resolve();

let api: LocalContentApi | null = null;

export async function withLocalContent(): Promise<LocalContentApi> {
  if (!api) api = await LocalContentApi.resolve();
  return api;
}
