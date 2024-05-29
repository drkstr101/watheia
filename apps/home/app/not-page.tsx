import { HomeView } from '@watheia/studio-ui';
import { type Metadata } from 'next';
import { loadCaseStudies } from '../lib/mdx';

export const metadata: Metadata = {
  description: 'Create better software with Watheia Labs',
};

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3);
  return <HomeView caseStudies={caseStudies} />;
}
