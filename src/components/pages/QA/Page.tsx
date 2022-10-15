import { Box, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import QACardWindow from '../../qa/QACardWindow'
import QACardList from '../../qa/QACardList'
import { SearchForm } from '../../qa/SearchForm'
import { useFetchQuestions } from '../../../hooks/question/useFetchQuestion'

export const Page = () => {
    const { data: questions = [], isLoading } = useFetchQuestions()
    return (
        <>
            <VStack pb={4} pt={6} w="100%" display="flex" alignItems="center">
                <Box w="full">
                    <Text as="h2" fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl' }} paddingX={4}>
                        学生生活Q&A
                    </Text>
                </Box>
                <Box display={{ base: 'block', xl: 'none' }} w="full">
                    <SearchForm questions={questions} />
                </Box>
            </VStack>
            <QACardWindow>
                <QACardList questions={questions} isLoading={isLoading} />
            </QACardWindow>
        </>
    )
}
