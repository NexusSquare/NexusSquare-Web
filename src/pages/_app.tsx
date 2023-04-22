import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps, AppPropsWithLayout } from 'next/app'
import { AuthProvider } from '../providers/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { chakraTheme } from '../styles/chakra/config'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={chakraTheme}>
                    <Toaster />
                    <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </RecoilRoot>
    )
}

export default MyApp
