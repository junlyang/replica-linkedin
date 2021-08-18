import wrapper from '../store'
import Head from 'next/head'
import '../styles/globals.css'
import 'antd/dist/antd.css';
import AppLayout from '../partials/AppLayout'
import axios from "axios";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>replica-linkedin</title>
          <meta property="og:title" content="My page title" key="title" />
      </Head>
      <AppLayout>
          <Component {...pageProps}/>
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(MyApp)
