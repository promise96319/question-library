import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css'
import Head from '../components/common/head'

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return <>
    <Head baiduTongJi={true}></Head>
    <Component {...pageProps} />
  </>
}
