import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

import { RootLayout } from '@watheia/studio-ui';

import '@watheia/cabbage.theme';

export const metadata: Metadata = {
  title: {
    template: '%s - Watheia Labs',
    default: 'Watheia Labs - We make technology easy for you.',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log(api.documents);
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
        <Analytics />
      </body>
    </html>
  );
}
