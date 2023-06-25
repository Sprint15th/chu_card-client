import Head from 'next/head';

type Props = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

const MetaData = ({ title, description, url, image }: Props) => {
  return (
    <Head>
      <title>{title || '츄카드'}</title>
      <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
      <meta name='description' content={description || '추카 받고싶지않나요?'} />
      <meta property='og:title' content={title || '츄카드'} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={image} />
      <meta property='og:article:author' content='츄카드' />
    </Head>
  );
};

export default MetaData;
