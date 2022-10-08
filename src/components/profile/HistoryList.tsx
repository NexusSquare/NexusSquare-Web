import { VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { History } from '../../types/domain/history'
import { HistoryCard } from './HistoryCard'

interface Props {
    historyList: History[]
}

export const HistoryList = ({ historyList }: Props) => {
    if (!historyList) {
        return (
            <VStack p="4">
                <Text fontSize={'md'}>質問履歴が存在しません</Text>
            </VStack>
        )
    }
    return (
        <VStack m="0" w="full" pt="4">
            {historyList.map((history) => {
                return <HistoryCard history={history} key={history.historyId} />
            })}
        </VStack>
    )
}
