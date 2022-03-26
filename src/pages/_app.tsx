import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme(
    {
      styles :{
        global: {
          html: { height:"100%" },
          body: { height:"100%" }
        }
      },
    }
  )
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
