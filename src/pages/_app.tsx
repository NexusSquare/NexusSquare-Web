import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme(
    {
      colors: {
        mainColor: '#FF9037',
        subColor: '#FBF6F0',
        subSubColor: '#FFDA77',
        accentColor: '#3DB2FF'
      },
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
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
