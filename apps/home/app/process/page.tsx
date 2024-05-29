import { ProcessView } from '@watheia/studio-ui';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
};

export default function Process() {
  return <ProcessView />;
}
