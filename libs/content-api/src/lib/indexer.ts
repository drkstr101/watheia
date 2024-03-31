import {
  ALGOLIA_ADMIN_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME_SUFFIX,
  buildIndexName,
} from '@watheia/content-helpers';
import { types } from '@watheia/content-model';
import algoliasearch from 'algoliasearch';
import { Lexer, marked } from 'marked';

import { LocalContentApi } from './content-api';
import { LocalContentSchema } from './content-api.types';
import { PlainTextRenderer } from './markdown-plaintext';

export async function indexer(schema: LocalContentSchema) {
  if (!ALGOLIA_APP_ID || !ALGOLIA_INDEX_NAME_SUFFIX || !ALGOLIA_ADMIN_API_KEY) {
    throw new Error('Missing required configuration for indexing');
  }

  console.time('Indexing duration');
  const api = await LocalContentApi.create(schema);
  const posts = api.cache.pages.filter((p) => p.type == 'Article') as types.Article[];

  const objectsToIndex = await buildObjectsToIndex(posts);
  await indexObjects(objectsToIndex);
  console.timeEnd('Indexing duration');

  return objectsToIndex.map((o) => o.url);
}

async function buildObjectsToIndex(posts: types.Article[]) {
  marked.use({ gfm: true });
  const mdLexer = new marked.Lexer();
  const mdPlainTextRenderer = new PlainTextRenderer({});

  console.log('Preparing data for indexing...');
  const objectsToIndex = await Promise.all(
    posts.map(async (post) => {
      const o = {
        objectID: post.__metadata.id,
        url: post.__metadata.urlPath,
        slug: post.slug,
        title: post.title,
        date: post.date,
        authorName: post.author?.name,
        authorImage: post.author?.image?.url,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage?.url,
        contentBody: '',
        contentHeading: '',
      };

      if (post.markdown_content) {
        const { heading, body } = await parseMarkdown(
          post.markdown_content,
          mdLexer,
          mdPlainTextRenderer
        );
        o.contentHeading = heading;
        o.contentBody = body;
      }
      return o;
    })
  );
  return objectsToIndex;
}

async function parseMarkdown(
  markdown: string,
  lexer: Lexer,
  renderer: PlainTextRenderer
): Promise<{ body: string; heading: string }> {
  const body = await marked(markdown, { renderer });
  let heading = '';
  const tokens = lexer.lex(markdown);
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      heading = token.text;
      break;
    }
  }
  return { heading, body };
}

async function indexObjects(objectsToIndex: readonly Readonly<Record<string, any>>[]) {
  const indexName = buildIndexName();
  console.log('Indexing to', indexName);
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
  const index = client.initIndex(indexName);
  const response = await index.saveObjects(objectsToIndex);
  await index.setSettings({
    searchableAttributes: [
      'title',
      'contentHeading',
      'authorName',
      'excerpt',
      'slug',
      'contentBody',
      'date',
    ],
    customRanking: ['desc(date)'],
  });
  await client.destroy();
  console.log(`Indexed ${response.objectIDs.length} objects`);
}
