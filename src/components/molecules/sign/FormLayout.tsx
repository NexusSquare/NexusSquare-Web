import { Box, Divider, HStack, VStack, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    title: string
}

export const FormLayout = ({ children, title }: Props) => {
    return (
        <HStack w="100%" h="full" paddingX={{ base: 4, md: 0 }}>
            <VStack
                bg="white"
                w={{ base: 'full', md: '2xl' }}
                marginX={'auto'}
                paddingY={12}
                paddingX={{ base: 8, md: 24 }}
            >
                <Box as="h2" fontWeight={'bold'} fontSize={'xl'}>
                    {title}
                </Box>
                <Divider />

                {children}
            </VStack>
        </HStack>
    )
}
