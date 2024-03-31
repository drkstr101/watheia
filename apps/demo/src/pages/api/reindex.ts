import { indexer } from '@watheia/content-api';

import { defaultSchema } from '../../lib/content-api';

export default async function handler(req, res) {
  try {
    const result = await indexer(defaultSchema);
    res.status(200).send({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
