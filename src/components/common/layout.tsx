import { memo, ReactNode } from "react";
import Head from "next/head";
import Header from './header'
import { Box } from "@chakra-ui/react";

interface Props{
    children?: ReactNode,
    pageName: string
}

const Layout: Function = ({children, pageName}: Props) :JSX.Element =>{
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <Box>
            <Head>
            <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <title>{siteTitle}</title>
                <meta content="大学生活でわからないことがあればここで解決！Nexus Squareは、県大生が作った県大生のための情報共有サービスです。「この教養の授業気になるけど内容が分からないから教えてほしい！」などの疑問を県大の学生に相談しましょう!" name="description" />
                <meta charSet="utf-8" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content="大学生活でわからないことがあればここで解決！Nexus Squareは、県大生が作った県大生のための情報共有サービスです。" />
                <meta property="og:type" content="ページの種類" />
                <meta property="og:url" content="ページの URL" />
                <meta property="og:image" content="サムネイル画像の URL" />
                <meta property="og:site_name" content="Nexus Square" />
                <meta property="og:locale" content="ja_JP"  />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <Header/>
            {children}
        </Box>
    )
}
export default Layout