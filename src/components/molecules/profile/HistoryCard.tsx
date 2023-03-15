import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { convertTimestampToString } from '../../../lib/convert/convertTimestamp'
import { History, HistoryType } from '../../../entities/history'

interface Props {
    history: History
}

export const HistoryCard = ({ history }: Props) => {
    const convertType = (type: HistoryType): string => {
        let displayType = ''
        switch (type) {
            case 'ANSWER':
                displayType = '質問に回答'
                break
            case 'QUESTION':
                displayType = '質問を投稿'
                break
            case 'BEST_ANSWER':
                displayType = 'ベストアンサー'
                break
        }
        return displayType
    }
    return (
        <Box w="full" border="1px" borderColor="gray.300" cursor="pointer" key={history.historyId} rounded="md">
            <HStack bgColor="white" p="4" justify="space-between" spacing={{ base: '2', md: '12' }}>
                <Text fontSize={'sm'} color={'textGray'}>
                    {convertTimestampToString(history.createAt)}
                </Text>
                <HStack>
                    <Text fontSize={'md'}>{convertType(history.type)}</Text>
                    <HiOutlineLightBulb size="30" />
                </HStack>
                <Text fontSize={{ base: 'md', md: 'xl' }} color="red.400">
                    +{history.point}pt
                </Text>
            </HStack>
        </Box>
    )
}
