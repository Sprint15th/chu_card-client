import { useEffect } from "react";
import type { AppProps } from "next/app";
import PageTemplate from "@/components/PageTemplate";
import "@/styles/global.css";
import "@/styles/swiper.css";

function setScreenSize() {
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setScreenSize();
  }, []);

  useEffect(() => {
    const onResize = () => {
      setScreenSize();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
}
