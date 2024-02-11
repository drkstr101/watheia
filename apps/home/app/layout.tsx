import '@watheia/studio-ui/style.css';
import { Metadata } from 'next';

import { RootLayout } from '@watheia/studio-ui';
// import api from '../lib/content-api';

export const metadata: Metadata = {
  title: {
    template: '%s - Watheia Labs',
    default: 'Watheia Labs - We make technology easy for you.',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log(api.documents);
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
