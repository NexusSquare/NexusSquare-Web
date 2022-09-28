import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../CommonMeta'
import { Footer } from '../QA/Footer'
import { Header } from '../Header'
import { RightBar } from '../QA/RigthBar'
import { LeftBar } from './LeftBar'

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
            <HStack spacing="0px" paddingTop={{ base: '100px', md: '60px' }}>
                <LeftBar />
                <VStack
                    w={{
                        base: '100%',
                        sm: '100vw',
                        md: 'calc(100vw - 210px)',
                        lg: 'calc(100vw - 210px)',
                        xl: 'calc(400px + 50vw)',
                    }}
                    paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
                    spacing={0}
                >
                    {children}
                    <Footer />
                </VStack>
                <RightBar />
            </HStack>
        </>
    )
}