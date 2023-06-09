import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'react-day-picker/dist/style.css';
import 'toastify-js/src/toastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <><Head>
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
    />
  </Head>
    <Component {...pageProps} />
  </>
}