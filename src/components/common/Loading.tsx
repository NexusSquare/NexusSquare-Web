import { CircularProgress, HStack, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

export const Loading = () => {
    return (
        <VStack h="100vh" justify={'center'}>
            <HStack>
                <CircularProgress isIndeterminate color="mainColor" />
            </HStack>
        </VStack>
    )
}
