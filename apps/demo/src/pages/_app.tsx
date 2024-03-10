import { AppProps } from 'next/app';
import { WithNinetailedProvider } from '../utils/ninetailed-helpers';

import '../css/main.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <WithNinetailedProvider>
      <Component {...pageProps} />
    </WithNinetailedProvider>
  );
}

export default CustomApp;
