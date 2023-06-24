import type { AppProps } from "next/app";
import PageTemplate from "@/components/PageTemplate";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  );
}
