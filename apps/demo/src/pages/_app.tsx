import { AppProps } from 'next/app';
import { WithNinetailedProvider } from '@watheia/cabbage.ui-provider';

import '../css/main.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <WithNinetailedProvider>
      <Component {...pageProps} />
    </WithNinetailedProvider>
  );
}

export default CustomApp;
