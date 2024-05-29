import { GoogleAnalytics } from '@next/third-parties/google';
import { config } from '@watheia/content-helpers';
import { RootLayout } from '@watheia/studio-ui';
import { Metadata } from 'next';

import '@watheia/home.ui-provider/styles.css';
import './global.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Watheia Labs',
    default: 'Create better software with Watheia Labs',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log(api.documents);
  return (
    <html lang="en" className="mx-1 bg-black">
      <body>
        <RootLayout>{children}</RootLayout>
        <GoogleAnalytics gaId={config.gaId} />
      </body>
    </html>
  );
}
