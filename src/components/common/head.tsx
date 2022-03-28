import React from 'react'
import Head from 'next/head'

interface HeadComponentProps {
  title?: string
  description?: string
  keywords?: string
  baiduTongJi?: boolean
}

const HeadComponent = (props: HeadComponentProps) => {
  const { title, description, keywords, baiduTongJi } = props
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <link rel="shortcut icon" href="/favicon.ico"/>
        {baiduTongJi && <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1bf6e3da582dab4c253e441df11050a3";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
`,
        }}></script>}
      </Head>
    </>
  )
}

HeadComponent.defaultProps = {
  title: '初中道德与法治试题库',
  description: '初中道德与法治课程试题库',
  keywords: '初中试题库，道德与法治，七年级上册，七年级下册，八年级上册，八年级下册，九年级上册，九年级下册，试题库',
  baiduTongJi: false,
}

export default HeadComponent
