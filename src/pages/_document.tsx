import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>{'츄카드'}</title>
        <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
        <meta name='description' content={'추카 받고싶지않나요?'} />
        <meta property='og:title' content={'츄카드'} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={'https://chu-card-client.vercel.app/'} />
        <meta property='og:image' content={'/logo.png'} />
        <meta property='og:article:author' content='츄카드' />
      </Head>
      <body>
        <div id='portal'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
