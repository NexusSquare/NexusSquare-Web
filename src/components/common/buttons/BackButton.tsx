import { HStack, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export const BackButton = () => {
    const router = useRouter()
    const onClick = () => {
        router.back()
    }
    return (
        <HStack w="full" p="4">
            <HStack onClick={onClick} as="button" spacing={1}>
                <IoIosArrowBack />
                <Text as="a" fontSize="md" fontWeight={'bold'}>
                    戻る
                </Text>
            </HStack>
        </HStack>
    )
}
