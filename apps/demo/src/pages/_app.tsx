import { AppProps } from 'next/app';
import { WithNinetailedProvider } from '../components/withPersonalization/ninetailed-provider';

import '../css/main.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <WithNinetailedProvider>
      <Component {...pageProps} />
    </WithNinetailedProvider>
  );
}

export default CustomApp;
