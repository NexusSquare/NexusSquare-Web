import { Box, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import QACardWindow from '../../organisms/qa/QACardWindow'
import QACardList from '../../organisms/qa/QACardList'
import { SearchForm } from '../../molecules/qa/SearchForm'
import { STATUS } from '../../../constants/qa/status'
import { useRouter } from 'next/router'
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { SortItem } from '../../../constants/sort'
import { SortDrawer } from '../../organisms/qa/SortDrawer'
import { CategoryDrawer } from '../../organisms/qa/CategoryDrawer'
import { QACategory } from '../../../constants/query'
import { INIT_PAGE } from '../../../constants/qa/page'
import { SpProvider } from '../../../providers/SpProvider'

import { useFetchQuestions } from '../../../hooks/question/useFetchQuestion'
import { useSearchQuestionQuery } from './hooks'
import { RightBar } from '../../layouts/RightBar'
import { Footer } from '../../layouts/Footer'
import { SearchLeftBar } from './_SearchLeftBar'
import { ContentsLayout } from '../../layouts/ContentsLayout'
import { ReadMoreButton } from './_ReadMoreButton'

export const QAPage = () => {
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()
    const router = useRouter()
    const errorToast = useErrorToast()

    // NOTE questionQueryが変更されると再フェッチされる
    const { questionQuery, sortQuestions, filterQuestions, changeQuestionStatus, resetCategories, updatePageNumber } =
        useSearchQuestionQuery()
    const { data: questions = [], isLoading } = useFetchQuestions(questionQuery)

    const [page, setPage] = useState(questionQuery.page)
    const clickSearch = (text: string) => {
        if (text.length <= 1) {
            errorToast('2文字以上入力してください')
            return
        }
        router.push({ pathname: PAGE_LINKS.QA.RESULT.URL, query: { title: text } })
    }

    const clickSort = (sortItem: SortItem) => {
        sortQuestions(sortItem)
        onCloseSortDrawer()
    }

    const clickFilter = (categories: QACategory[]) => {
        filterQuestions(categories)
        onCloseCategoryDrawer()
    }

    const clickReset = () => {
        resetCategories()
    }

    const readMore = () => {
        const newPage = page + 1
        updatePageNumber(newPage)
        setPage(newPage)
    }

    return (
        <ContentsLayout
            Left={
                <SearchLeftBar
                    sortQuestions={sortQuestions}
                    filterQuestions={filterQuestions}
                    questionNum={questions.length}
                    initCategories={questionQuery.categories}
                    initDirection={questionQuery.direction}
                    initOrderBy={questionQuery.orderBy}
                />
            }
        >
            <VStack spacing={0}>
                <VStack pb={4} pt={6} w="100%" alignItems="center">
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
                            categoryCount={questionQuery.categories.length}
                        />
                    </Box>
                </VStack>

                <QACardWindow>
                    <QACardList
                        questions={questions}
                        isLoading={isLoading}
                        changeStatus={changeQuestionStatus}
                        initStatus={questionQuery.status}
                    />
                    {questions.length > 0 && <ReadMoreButton onClick={readMore} />}
                </QACardWindow>

                <SpProvider>
                    <SortDrawer
                        onClose={onCloseSortDrawer}
                        isOpen={isOpenSortDrawer}
                        clickSort={clickSort}
                        initDirection={questionQuery.direction}
                        initOrderBy={questionQuery.orderBy}
                    />
                    <CategoryDrawer
                        onClose={onCloseCategoryDrawer}
                        isOpen={isOpenCategoryDrawer}
                        clickFilter={clickFilter}
                        clickReset={clickReset}
                        initCategories={questionQuery.categories}
                    />
                </SpProvider>
            </VStack>
        </ContentsLayout>
    )
}
