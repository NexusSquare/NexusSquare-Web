import React, { ReactNode } from 'react'
import { Header } from './Header'
import CommonMeta from './CommonMeta'
import { Box } from '@chakra-ui/react'
import { HEADER_HEIGHT, SP_HEADER_HEIGHT } from './constants'

interface Props {
    children?: ReactNode
    pageName: string
}

//　NOTE: routingのpageは配下で使用する。
export const DefaultLayout = ({ children, pageName }: Props): JSX.Element => {
    const siteTitle: string = `Nexus Square（ネクスク） - ${pageName}`
    return (
        <>
            <CommonMeta siteTitle={siteTitle} />
            <Header />
            <Box paddingTop={{ base: SP_HEADER_HEIGHT, md: HEADER_HEIGHT }} as="main">
                {children}
            </Box>
        </>
    )
}
