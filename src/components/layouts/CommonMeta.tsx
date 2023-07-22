import Head from 'next/head'
import React from 'react'

interface Props {
    siteTitle: string
}
const CommonMeta = ({ siteTitle }: Props) => {
    const ogpImageUrl: string = '/images/ogp.png'
    return (
        <Head>
            <link rel="icon" href="/favicons/favicon.ico" />
            <link rel="/favicons/apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <title>{siteTitle}</title>
            <meta
                content="大学生活でわからないことがあればここで解決！Nexus Squareは、県大生が作った県大生のための情報共有サービスです。「この教養の授業気になるけど内容が分からないから教えてほしい！」などの疑問を県大の学生に相談しましょう!"
                name="description"
            />
            <meta charSet="utf-8" />
            <meta property="og:title" content={siteTitle} />
            <meta
                property="og:description"
                content="大学生活でわからないことがあればここで解決！Nexus Squareは、県大生が作った県大生のための情報共有サービスです。"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="ページの URL" />
            <meta property="og:image" content={ogpImageUrl} />
            <meta property="og:site_name" content="Nexus Square | ネクスク" />
            <meta property="og:locale" content="ja_JP" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="robots" content="noindex,nofollow" />
        </Head>
    )
}

export default CommonMeta
