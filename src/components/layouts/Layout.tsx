import React, { ReactNode } from 'react'

import { Footer } from './Footer'

import { DefaultLayout } from './DefaultLayout'

interface Props {
    children?: ReactNode
    pageName: string
}

export const Layout = ({ children, pageName }: Props): JSX.Element => {
    return (
        <DefaultLayout pageName={pageName}>
            {children}
            <Footer />
        </DefaultLayout>
    )
}
