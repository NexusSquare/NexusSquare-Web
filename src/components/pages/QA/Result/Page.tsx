import { Box, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import QACardWindow from '../../../organisms/qa/QACardWindow'
import QACardList from '../../../organisms/qa/QACardList'
import { SearchForm } from '../../../molecules/qa/SearchForm'
import { useFetchQuestions, useFetchQuestionsByTitle } from '../../../../hooks/question/useFetchQuestion'
import { QuestionQuery } from '../../../../constants/query'
import { STATUS } from '../../../../constants/qa/status'
import { useRouter } from 'next/router'
import { LINKS } from '../../../../constants/links'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'

type QuestionStatus = keyof typeof STATUS

export const Page = () => {
    const initQuestionQuery: QuestionQuery = {
        status: STATUS.NOT_SOLVED,
        orderBy: 'createAt',
    }
    const [questionQuery, setQuestionQuery] = useState<QuestionQuery>(initQuestionQuery)
    const router = useRouter()
    const errorToast = useErrorToast()
    const { title } = router.query

    const { data: questions = [], isLoading } = useFetchQuestionsByTitle(String(title))

    const changeQuestionStatus = (status: QuestionStatus) => {
        setQuestionQuery((query: QuestionQuery) => {
            return { ...query, status }
        })
    }

    const clickSearch = (text: string) => {
        if (text.length <= 1) {
            errorToast('2文字以上入力してください')
            return
        }
        router.push({ pathname: LINKS.QUESTION_RESULT, query: { title: text } })
    }
    return (
        <>
            <VStack pb={4} pt={6} w="100%" display="flex" alignItems="center">
                <Box w="full">
                    <Text as="h2" fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl' }} paddingX={4}>
                        学生生活Q&A
                    </Text>
                </Box>
                <Box display={{ base: 'block', xl: 'none' }} w="full">
                    <SearchForm questions={questions} clickSearch={clickSearch} />
                </Box>
            </VStack>
            <QACardWindow>
                <QACardList questions={questions} isLoading={isLoading} changeStatus={changeQuestionStatus} />
            </QACardWindow>
        </>
    )
}
