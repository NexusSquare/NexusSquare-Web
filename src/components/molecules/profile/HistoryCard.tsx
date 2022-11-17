import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { convertTimestampToString } from '../../../lib/convert/convertTimestamp'
import { History } from '../../../../entities/history'

interface Props {
    history: History
}

export const HistoryCard = ({ history }: Props) => {
    return (
        <Box bgColor="mainColor" boxShadow="xl" w="full" p="2px" cursor="pointer" key={history.historyId} rounded="md">
            <HStack bgColor="white" p="4" justify="space-evenly" spacing={{ base: '2', md: '12' }}>
                <Text fontSize={{ base: 'sm', md: 'lg' }}>{convertTimestampToString(history.createAt)}</Text>
                <HStack>
                    <Text fontSize={{ base: 'md', md: 'xl' }}>
                        {history.type === 'ANSWER' ? '質問に答えた' : '質問を投稿した'}
                    </Text>
                    <HiOutlineLightBulb size="30" />
                </HStack>
                <Text fontSize={{ base: 'md', md: 'xl' }} color="red.400">
                    +{history.point}pt
                </Text>
            </HStack>
        </Box>
    )
}
