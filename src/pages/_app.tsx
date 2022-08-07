import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    const theme = extendTheme({
        styles: {
            global: {
                html: { height: '100%' },
                body: { height: '100%' },
            },
        },
    })
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ChakraProvider>
    )
}

export default MyApp
