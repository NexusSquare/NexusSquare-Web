import { VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { HistoryCard } from './HistoryCard'
import History from '../../types/domain/account/History'

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
        <VStack m="0" w="full" p="2%">
            {historyList.map((history) => {
                ;<HistoryCard history={history} key={history.id} />
            })}
            <HistoryCard history={historyList[0]} key={1} />
            <HistoryCard history={historyList[1]} key={2} />
            <HistoryCard history={historyList[2]} key={3} />
        </VStack>
    )
}
