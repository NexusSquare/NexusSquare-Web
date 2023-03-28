import { Box } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../CommonMeta'

interface Props {
    children?: ReactNode
    pageName: string
}

export const FormLayout = ({ children, pageName }: Props): JSX.Element => {
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
