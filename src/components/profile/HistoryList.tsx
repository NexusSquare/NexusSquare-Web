import { VStack } from '@chakra-ui/react'
import React from 'react'
import { HistoryCard } from './HistoryCard'

export const HistoryList = () => {
    return (
        <VStack m="0" w="full" p="2%">
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
        </VStack>
    )
}
