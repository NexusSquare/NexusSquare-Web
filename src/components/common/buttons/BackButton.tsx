import { HStack, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export const BackButton = () => {
    const router = useRouter()
    const onClick = () => {
        router.back()
    }
    return (
        <HStack w={'full'} p="4" onClick={onClick}>
            <Text as="a" fontSize="lg" fontWeight="bold" cursor="pointer">
                <Box as="span" color="mainColor">
                    ◀︎
                </Box>
                戻る
            </Text>
        </HStack>
    )
}
