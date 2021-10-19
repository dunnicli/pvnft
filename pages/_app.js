import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "../components/Navbar.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
