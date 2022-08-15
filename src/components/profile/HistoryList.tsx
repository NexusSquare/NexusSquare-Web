import { VStack } from '@chakra-ui/react'
import React from 'react'
import { HistoryCard } from './HistoryCard'
import History from '../../types/domain/account/History'

interface Props {
    history: History
}

export const HistoryList = ({ history }: Props) => {
    return (
        <VStack m="0" w="full" p="2%">
            <HistoryCard history={history} />
            <HistoryCard history={history} />
            <HistoryCard history={history} />
            <HistoryCard history={history} />
            <HistoryCard history={history} />
        </VStack>
    )
}
