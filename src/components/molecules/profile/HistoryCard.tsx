import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { convertDateToString } from '../../../lib/convert/convertTimestamp'
import { History, HistoryType } from '../../../entities/history'

interface Props {
    history: History
}

export const HistoryCard = ({ history }: Props) => {
    const convertType = (type: HistoryType): string => {
        switch (type) {
            case 'ANSWER':
                return '質問に回答'
            case 'QUESTION':
                return '質問を投稿'
            case 'BEST_ANSWER':
                return 'ベストアンサー'
        }
    }
    return (
        <Box w="full" border="1px" borderColor="gray.300" cursor="pointer" key={history.historyId} rounded="md">
            <HStack bgColor="white" p="4" justify="space-between" spacing={{ base: '2', md: '12' }}>
                <VStack justifyContent={'center'} alignItems={'start'}>
                    <HStack>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {convertType(history.type)}
                        </Text>
                        <Box pb={1}>
                            <HiOutlineLightBulb size="20" />
                        </Box>
                    </HStack>
                    <Text fontSize={'sm'} color={'textGray'}>
                        {convertDateToString(history.createdAt)}
                    </Text>
                </VStack>

                <Text fontSize={'md'} color="red.400" fontWeight={'bold'}>
                    +{history.point}pt
                </Text>
            </HStack>
        </Box>
    )
}
