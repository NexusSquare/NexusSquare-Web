import { memo, ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import CommonMeta from './CommonMeta,'
import Header from './Header'

interface Props {
    children?: ReactNode
    pageName: string
}

const Layout: Function = ({ children, pageName }: Props): JSX.Element => {
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <Box paddingTop={{ base: '100px', md: '60px' }}>
            <CommonMeta siteTitle={siteTitle} />
            {children}
        </Box>
    )
}
export default Layout
