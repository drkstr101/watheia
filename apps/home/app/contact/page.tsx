import { ContactView } from '@watheia/studio-ui';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Let’s work together. We can’t wait to hear from you.',
};

export default function Contact() {
  return <ContactView />;
}
