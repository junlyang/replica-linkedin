import { useEffect } from "react"
import wrapper from '../store'
import Head from 'next/head'
import '../styles/globals.css'
import 'antd/dist/antd.css';
import AppLayout from '../partials/AppLayout'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return (
    <>
      <Head>
          <title>replica-linkedin</title>
          <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
          <meta property="og:title" content="My page title" key="title" />
      </Head>
      <AppLayout>
          <Component {...pageProps}/>
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(MyApp)
