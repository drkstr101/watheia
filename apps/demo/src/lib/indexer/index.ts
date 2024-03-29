// import { resolveContent } from '@watheia/content-api';
import algoliasearch from 'algoliasearch';
import { Lexer, marked } from 'marked';

import { withLocalContent } from '../content-api';
import {
  ALGOLIA_ADMIN_API_KEY,
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME_SUFFIX,
  buildIndexName,
} from './consts';
import PlainTextRenderer from './markdown-plaintext';

export async function index() {
  if (!ALGOLIA_APP_ID || !ALGOLIA_INDEX_NAME_SUFFIX || !ALGOLIA_ADMIN_API_KEY) {
    throw new Error('Missing required configuration for indexing');
  }

  console.time('Indexing duration');
  const api = await withLocalContent();
  const posts = api.cache.pages.filter((p: any) => p.type == 'Article');

  const objectsToIndex = buildObjectsToIndex(posts);
  await indexObjects(objectsToIndex);
  console.timeEnd('Indexing duration');

  return objectsToIndex.map((o: { url: any }) => o.url);
}

function buildObjectsToIndex(posts: any[]) {
  marked.use({ gfm: true });
  const mdLexer = new marked.Lexer();
  const mdPlainTextRenderer = new PlainTextRenderer({});

  console.log('Preparing data for indexing...');
  const objectsToIndex = posts.map(
    (post: {
      __metadata: { id: any; urlPath: any };
      slug: any;
      title: any;
      date: any;
      author: { name: any; image: { url: any } };
      excerpt: any;
      featuredImage: { url: any };
      content: any;
    }) => {
      const o: any = {
        objectID: post.__metadata.id,
        url: post.__metadata.urlPath,
        slug: post.slug,
        title: post.title,
        date: post.date,
        authorName: post.author?.name,
        authorImage: post.author?.image?.url,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage?.url,
      };

      if (post.content) {
        const { heading, body } = parseMarkdown(post.content, mdLexer, mdPlainTextRenderer);
        o.contentHeading = heading;
        o.contentBody = body;
      }
      return o;
    }
  );
  return objectsToIndex;
}

function parseMarkdown(markdown: string, lexer: Lexer, renderer: PlainTextRenderer) {
  const body = marked(markdown, { renderer });
  let heading = null;
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
