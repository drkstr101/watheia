import { WithNinetailedProvider } from '@watheia/cabbage.ui-provider';
import { AppProps } from 'next/app';

import '@watheia/cabbage.theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <WithNinetailedProvider>
      <Component {...pageProps} />
    </WithNinetailedProvider>
  );
}

export default CustomApp;
