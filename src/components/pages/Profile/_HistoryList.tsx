import { VStack, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { History } from '../../../entities/history'
import { NoCards } from '../../ui/common/NoCards'
import { HistoryCard } from '../../ui/features/Profile/HistoryCard'

interface Props {
    historyList: History[]
}

export const HistoryList = ({ historyList }: Props) => {
    if (historyList.length === 0) {
        return <NoCards text="履歴はまだありません。" />
    }
    return (
        <Box m="0" w="full">
            {historyList.map((history) => {
                return <HistoryCard history={history} key={history.historyId} />
            })}
        </Box>
    )
}
