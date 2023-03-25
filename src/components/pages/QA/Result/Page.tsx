import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import QACardWindow from '../../../organisms/qa/QACardWindow'
import QACardList from '../../../organisms/qa/QACardList'
import { SearchForm } from '../../../molecules/qa/SearchForm'
import { useFetchQuestions, useFetchQuestionsByTitle } from '../../../../hooks/question/useFetchQuestion'
import { QACategory, QuestionQuery } from '../../../../constants/query'

import { useRouter } from 'next/router'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { SortDrawer } from '../../../organisms/qa/SortDrawer'
import { CategoryDrawer } from '../../../organisms/qa/CategoryDrawer'
import { SortItem } from '../../../../constants/sort'
import { useSearchQuestionQuery } from '../hooks'
import { SearchLeftBar } from '../_SearchLeftBar'
import { SpProvider } from '../../../../providers/SpProvider'
import { ContentsLayout } from '../../../layouts/ContentsLayout'

interface Props {
    title?: string
}
export const QAResultPage = ({ title }: Props) => {
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()

    const router = useRouter()
    const errorToast = useErrorToast()

    const { questionQuery, sortQuestions, filterQuestions, changeQuestionStatus, resetCategories, searchByTitle } =
        useSearchQuestionQuery()
    const { data: questions = [], isLoading } = useFetchQuestionsByTitle(questionQuery)

    useEffect(() => {
        if (!title) return
        searchByTitle(title)
    }, [title])

    const clickSearch = (text: string) => {
        if (text.length == 0) {
            router.push(PAGE_LINKS.QA.URL)
            return
        } else if (text.length <= 1) {
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
