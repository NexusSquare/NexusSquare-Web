import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi'
export const HistoryCard = () => {
    return (
        <Box bgColor="mainColor" boxShadow="xl" w="full" p="2px" pl="64px" cursor="pointer">
            <HStack bgColor="subColor" p="4" justify="center" spacing={{ base: '2', md: '12' }}>
                <Text fontSize={{ base: 'sm', md: 'lg' }}>yyyy.MM.dd</Text>
                <HStack>
                    <Text fontSize={{ base: 'lg', md: '2xl' }}>質問に答えた</Text>
                    <HiOutlineLightBulb size="30" />
                </HStack>
                <Text fontSize={{ base: 'md', md: '2xl' }} color="red.400">
                    +20pt
                </Text>
            </HStack>
        </Box>
    )
}
