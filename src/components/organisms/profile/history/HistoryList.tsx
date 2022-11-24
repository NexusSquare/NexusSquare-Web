import { VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { History } from '../../../../entities/history'
import { NoCards } from '../../../common/NoCards'
import { HistoryCard } from '../../../molecules/profile/HistoryCard'

interface Props {
    historyList: History[]
}

export const HistoryList = ({ historyList }: Props) => {
    if (historyList.length === 0) {
        return <NoCards text="履歴はまだありません。" />
    }
    return (
        <VStack m="0" w="full" pt="4">
            {historyList.map((history) => {
                return <HistoryCard history={history} key={history.historyId} />
            })}
        </VStack>
    )
}
