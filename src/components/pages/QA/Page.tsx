import { Box, Radio, RadioGroup, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import QACardWindow from '../../organisms/qa/QACardWindow'
import QACardList from '../../organisms/qa/QACardList'
import { SearchForm } from '../../molecules/qa/SearchForm'
import { useFetchQuestions, useFetchQuestionsByTitle } from '../../../hooks/question/useFetchQuestion'
import { QACategory, QuestionQuery } from '../../../constants/query'
import { STATUS } from '../../../constants/qa/status'
import { useRouter } from 'next/router'
import { LINKS } from '../../../constants/links'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { Drawer } from '../../common/Drawer'
import { PrimaryButton } from '../../common/PrimaryButton'
import { SORT, SortItem } from '../../../constants/sort'
import { SortDrawer } from '../../organisms/qa/SortDrawer'
import { CategoryDrawer } from '../../organisms/qa/CategoryDrawer'

type QuestionStatus = keyof typeof STATUS

export const Page = () => {
    const initQuestionQuery: QuestionQuery = {
        status: STATUS.NOT_SOLVED,
        orderBy: 'createAt',
        direction: 'asc',
    }
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()
    const [questionQuery, setQuestionQuery] = useState<QuestionQuery>(initQuestionQuery)
    const { data: questions = [], isLoading } = useFetchQuestions(questionQuery)
    const router = useRouter()
    const errorToast = useErrorToast()

    const changeQuestionStatus = (status: QuestionStatus) => {
        setQuestionQuery((query) => {
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

    const clickSort = (sortItem: SortItem) => {
        const { orderBy, direction } = sortItem
        setQuestionQuery((query) => {
            return { ...query, orderBy, direction }
        })
        onCloseSortDrawer()
    }

    const clickFilter = (categories: QACategory[]) => {
        setQuestionQuery((query) => {
            return { ...query, categories }
        })
        onCloseCategoryDrawer()
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
                    <SearchForm
                        questions={questions}
                        clickSearch={clickSearch}
                        openSortDrawer={onOpenSortDrawer}
                        openCategoryDrawer={onOpenCategoryDrawer}
                    />
                </Box>
            </VStack>
            <QACardWindow>
                <QACardList questions={questions} isLoading={isLoading} changeStatus={changeQuestionStatus} />
            </QACardWindow>
            <Box display={{ base: 'block', md: 'none' }}>
                <SortDrawer onClose={onCloseSortDrawer} isOpen={isOpenSortDrawer} clickSort={clickSort} />
            </Box>
            <Box display={{ base: 'block', md: 'none' }}>
                <CategoryDrawer
                    onClose={onCloseCategoryDrawer}
                    isOpen={isOpenCategoryDrawer}
                    clickFilter={clickFilter}
                />
            </Box>
        </>
    )
}
