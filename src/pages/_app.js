import React from 'react'
import '../styles/global.css'
import 'antd/dist/antd.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}