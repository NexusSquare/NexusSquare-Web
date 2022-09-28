import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps, AppPropsWithLayout } from 'next/app'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    const theme = extendTheme({
        colors: {
            mainColor: '#FF9037',
            subColor: '#FBF6F0',
            subSubColor: '#FFDA77',
            accentColor: '#3DB2FF',
            textPrimary: '#1A202C',
        },
        styles: {
            global: {
                html: { height: '100%' },
                body: { height: '100%' },
            },
        },
    })
    return <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
}

export default MyApp
