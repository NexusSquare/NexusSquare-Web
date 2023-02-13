import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from './CommonMeta'
import { Footer } from './Footer'
import { Header } from './Header'
import { DefaultLayout } from './DefaultLayout'

interface Props {
    children?: ReactNode
    pageName: string
}

export const Layout = ({ children, pageName }: Props): JSX.Element => {
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <DefaultLayout pageName={siteTitle}>
            {children}
            <Footer />
        </DefaultLayout>
    )
}
