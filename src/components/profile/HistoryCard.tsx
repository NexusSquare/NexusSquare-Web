import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi'
import History from '../../types/domain/account/History'

interface Props {
    history: History
}

export const HistoryCard = ({ history }: Props) => {
    return (
        <Box bgColor="mainColor" boxShadow="xl" w="full" p="2px" pl="64px" cursor="pointer" key={history.id}>
            <HStack bgColor="subColor" p="4" justify="center" spacing={{ base: '2', md: '12' }}>
                <Text fontSize={{ base: 'sm', md: 'lg' }}>{history.createAt}</Text>
                <HStack>
                    <Text fontSize={{ base: 'md', md: '2xl' }}>質問に答えた</Text>
                    <HiOutlineLightBulb size="30" />
                </HStack>
                <Text fontSize={{ base: 'md', md: '2xl' }} color="red.400">
                    +{history.point}pt
                </Text>
            </HStack>
        </Box>
    )
}
