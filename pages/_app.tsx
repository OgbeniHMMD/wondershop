import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white">
      <Head>
        <title>Wondershop</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Wondershop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen ">
        <AppHeader />
        <div className="flex-grow pt-20">
          <Component {...pageProps} />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
