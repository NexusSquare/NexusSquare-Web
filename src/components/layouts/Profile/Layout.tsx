import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../CommonMeta'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { RightBar } from '../RigthBar'

import { MAIN_CONTENT_PADDING_LEFT, MAIN_CONTENT_WIDTH } from '../constants'
import { LeftBar } from '../LeftBar'

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
            <HStack spacing="0px" paddingTop={{ base: '96px', md: '56px' }}>
                <LeftBar />
                <VStack w={MAIN_CONTENT_WIDTH} spacing={0} pl={MAIN_CONTENT_PADDING_LEFT}>
                    {children}
                    <Footer />
                </VStack>
                <RightBar />
            </HStack>
        </>
    )
}
