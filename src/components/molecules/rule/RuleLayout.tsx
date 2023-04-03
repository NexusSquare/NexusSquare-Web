import { Heading, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    title: string
    children: ReactNode
}
export const RuleLayout = ({ title, children }: Props) => {
    return (
        <VStack align="left" w="full">
            <Heading as="h1" fontSize={'lg'}>
                {title}
            </Heading>
            {children}
        </VStack>
    )
}
