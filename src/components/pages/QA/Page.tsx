import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
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
import { Question } from '../../../entities/qa'
import { QACategory } from '../../../constants/query'
import { INIT_PAGE, PAGE_SIZE } from '../../../constants/qa/page'
import { SpProvider } from '../../../providers/SpProvider'

type QuestionStatus = keyof typeof STATUS

interface Props {
    questions: Question[]
    isLoading: boolean
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    changeStatus: (value: QuestionStatus) => void
    resetCategories: () => void
    updatePageNumber: (value: number) => void
}

export const Page = ({
    questions,
    isLoading,
    sortQuestions,
    filterQuestions,
    changeStatus,
    resetCategories,
    updatePageNumber,
}: Props) => {
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()
    const router = useRouter()
    const errorToast = useErrorToast()
    const [categoryCount, setCategoryCount] = useState(0)
    const [page, setPage] = useState(INIT_PAGE)
    const resetPage = () => {
        setPage(INIT_PAGE)
    }

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
        setCategoryCount(categories.length)
        resetPage()
        onCloseCategoryDrawer()
    }

    const clickReset = () => {
        resetCategories()
        resetPage()
        setCategoryCount(0)
    }

    const scrollPage = () => {
        updatePageNumber(page + PAGE_SIZE)
        setPage((page) => page + PAGE_SIZE)
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
                        categoryCount={categoryCount}
                    />
                </Box>
            </VStack>
            <QACardWindow>
                <QACardList
                    questions={questions}
                    isLoading={isLoading}
                    changeStatus={changeStatus}
                    scrollPage={scrollPage}
                />
            </QACardWindow>
            <SpProvider>
                <SortDrawer onClose={onCloseSortDrawer} isOpen={isOpenSortDrawer} clickSort={clickSort} />
                <CategoryDrawer
                    onClose={onCloseCategoryDrawer}
                    isOpen={isOpenCategoryDrawer}
                    clickFilter={clickFilter}
                    clickReset={clickReset}
                />
            </SpProvider>
        </>
    )
}
