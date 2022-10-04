import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps, AppPropsWithLayout } from 'next/app'
import { AuthProvider } from '../providers/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()
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
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
                </AuthProvider>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default MyApp
