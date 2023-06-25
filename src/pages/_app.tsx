import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import PageTemplate from '@/components/PageTemplate';
import '@/styles/global.css';
import '@/styles/swiper.css';

import { useKakaoScript } from 'react-kakao-share';

export default function App({ Component, pageProps }: AppProps) {
  useResizeEventHandler();
  useKakaoScript();
  return (
    <RecoilRoot>
      <PageTemplate>
        <Component {...pageProps} />
      </PageTemplate>
    </RecoilRoot>
  );
}

const useResizeEventHandler = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);
};

function setScreenSize() {
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
