import { VStack } from '@chakra-ui/react'
import React, { FormEventHandler, ReactNode } from 'react'
import { LEFT_BAR_HEIGHT, LEFT_BAR_WIDTH } from '../constants'

interface Props {
    children?: ReactNode
    windowH: number
}

export const BaseLeftBar: Function = ({ children }: Props): JSX.Element => {
    return (
        <VStack
            as="nav"
            aria-labelledby="QA navigation"
            bgColor="#FBF6F0"
            paddingTop={6}
            h={LEFT_BAR_HEIGHT}
            w={LEFT_BAR_WIDTH}
            display={{ base: 'none', xl: 'flex' }}
            position="fixed"
            top={{ base: '98px', md: '56px' }}
            left="0"
            paddingX={8}
            alignItems={'start'}
            overflow={'scroll'}
        >
            {children}
        </VStack>
    )
}
