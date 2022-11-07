import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import QACardWindow from '../../../organisms/qa/QACardWindow'
import QACardList from '../../../organisms/qa/QACardList'
import { SearchForm } from '../../../molecules/qa/SearchForm'
import { useFetchQuestions, useFetchQuestionsByTitle } from '../../../../hooks/question/useFetchQuestion'
import { QACategory, QuestionQuery } from '../../../../constants/query'
import { STATUS } from '../../../../constants/qa/status'
import { useRouter } from 'next/router'
import { LINKS } from '../../../../constants/links'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { SortDrawer } from '../../../organisms/qa/SortDrawer'
import { CategoryDrawer } from '../../../organisms/qa/CategoryDrawer'
import { SortItem } from '../../../../constants/sort'

type QuestionStatus = keyof typeof STATUS

export const Page = () => {
    const router = useRouter()
    const isReady = router.isReady
    const { title } = router.query
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()
    const [categoryCount, setCategoryCount] = useState(0)

    const initQuestionQuery: QuestionQuery = {
        status: STATUS.NOT_SOLVED,
        orderBy: 'createAt',
        direction: 'desc',
        categories: [],
        title: title ? String(title) : undefined,
    }

    const [questionQuery, setQuestionQuery] = useState<QuestionQuery>(initQuestionQuery)

    // NOTE routerが準備されるまでに時間がかかるため、タイトル更新を非同期にする
    useEffect(() => {
        if (!title) return
        setQuestionQuery((query: QuestionQuery) => {
            return { ...query, title: String(title) }
        })
    }, [isReady, title])

    const errorToast = useErrorToast()

    const { data: questions = [], isLoading } = useFetchQuestionsByTitle(questionQuery)

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
        setCategoryCount(categories.length)
        onCloseCategoryDrawer()
    }

    const clickReset = () => {
        setQuestionQuery((query) => {
            return { ...query, categories: [] }
        })
        setCategoryCount(0)
    }
    return (
        <>
            <VStack pb={4} pt={6} w="100%" display="flex" alignItems="center">
                <Box w="full">
                    <Text as="h2" fontWeight={'bold'} fontSize={{ base: 'xl', md: '2xl' }} paddingX={4}>
                        {title ? `${title}の検索結果` : '学生生活Q&A'}
                    </Text>
                </Box>
                <Box display={{ base: 'block', xl: 'none' }} w="full">
                    <SearchForm
                        questions={questions}
                        clickSearch={clickSearch}
                        openSortDrawer={onOpenSortDrawer}
                        openCategoryDrawer={onOpenCategoryDrawer}
                        categoryCount={categoryCount}
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
                    clickReset={clickReset}
                />
            </Box>
        </>
    )
}
