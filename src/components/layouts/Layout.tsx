import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from './CommonMeta'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
    children?: ReactNode
    pageName: string
}

export const Layout = ({ children, pageName }: Props): JSX.Element => {
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <>
            <CommonMeta siteTitle={siteTitle} />
            <Header />
            <Box paddingTop={{ base: '96px', md: '56px' }} as="main">
                {children}
            </Box>
            <Footer />
        </>
    )
}
