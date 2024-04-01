import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { RootLayout } from '@watheia/studio-ui';
import { Metadata } from 'next';

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
        <GoogleAnalytics gaId="G-GD3ZBX5EST" />
      </body>
    </html>
  );
}
