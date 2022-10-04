import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../CommonMeta'

import { Header } from '../Header'

interface Props {
    children?: ReactNode
    pageName: string
}

export const Layout = ({ children, pageName }: Props): JSX.Element => {
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <>
            <CommonMeta siteTitle={siteTitle} />
            <Box as="main" h="100vh" bg="subColor">
                {children}
            </Box>
        </>
    )
}
