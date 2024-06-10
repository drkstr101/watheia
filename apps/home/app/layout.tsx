import { GoogleAnalytics } from '@next/third-parties/google';
import { RootLayout } from '@watheia/studio-ui';
import { Metadata } from 'next';

import '@watheia/ui-provider/style.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Watheia Labs',
    default: 'Create better software with Watheia Labs',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  // console.log(api.documents);
  return (
    <html lang="en" className="m-1 bg-black">
      <body>
        <RootLayout>{children}</RootLayout>
        <GoogleAnalytics gaId="G-GD3ZBX5EST" />
      </body>
    </html>
  );
}
