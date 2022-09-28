import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Question from '../../../types/domain/qa/Question'

import QACardWindow from '../../qa/QACardWindow'
import QACardList from '../../qa/QACardList'
import QAQueryProps from '../../../constants/qa/queryGroup'
import { SearchForm } from '../../qa/SearchForm'

interface Props {
    questions: Question[]
}
export const Page = ({ questions }: Props) => {
    return (
        <>
            <VStack paddingY={4} w="100%" display="flex" alignItems="center">
                <Box display={{ base: 'block', md: 'none' }} w="full">
                    <SearchForm />
                </Box>
                <Box display={{ base: 'none', md: 'block' }} w="full">
                    <Text as="h2" fontWeight={'bold'} fontSize={'2xl'} paddingX={4}>
                        学生生活Q&A
                    </Text>
                </Box>
            </VStack>
            <QACardWindow>
                <QACardList data={questions} />
            </QACardWindow>
        </>
    )
}
