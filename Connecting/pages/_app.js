import React, { useState, useEffect } from "react";
import Head from "next/head";
import Cookies from "js-cookie";

import "../styles/globals.css";

import { Auth } from "../Components/index";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(true)
  useEffect(() => {
    const storedCookiedValue = Cookies.get("token");
    if (storedCookiedValue) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>AI Image Art</title>
        <meta
          name="description"
          content="AI Image Art Generator powered by rohan"
        />
        <link rel="shortcut icon" href="/assets/ailogo.png"/>

      </Head>
      {auth && <Auth/>}
      <Component {...pageProps} />
    </>
  );
}
