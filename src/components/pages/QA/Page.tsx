import { Box, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import QACardWindow from '../../qa/QACardWindow'
import QACardList from '../../qa/QACardList'
import { SearchForm } from '../../qa/SearchForm'
import { useFetchQuestions } from '../../../hooks/question/useFetchQuestion'

export const Page = () => {
    const { data: questions, isLoading } = useFetchQuestions()
    useEffect(() => {
        console.log(questions)
    }, [questions])
    return (
        <>
            <VStack paddingY={4} w="100%" display="flex" alignItems="center">
                <Box display={{ base: 'block', xl: 'none' }} w="full">
                    <SearchForm />
                </Box>
                <Box display={{ base: 'none', xl: 'block' }} w="full">
                    <Text as="h2" fontWeight={'bold'} fontSize={'2xl'} paddingX={4}>
                        学生生活Q&A
                    </Text>
                </Box>
            </VStack>
            <QACardWindow>{questions && <QACardList questions={questions} />}</QACardWindow>
        </>
    )
}
