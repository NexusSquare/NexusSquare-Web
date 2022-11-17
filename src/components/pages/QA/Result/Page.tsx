import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import QACardWindow from '../../../organisms/qa/QACardWindow'
import QACardList from '../../../organisms/qa/QACardList'
import { SearchForm } from '../../../molecules/qa/SearchForm'
import { useFetchQuestions, useFetchQuestionsByTitle } from '../../../../hooks/question/useFetchQuestion'
import { QACategory, QuestionQuery } from '../../../../constants/query'
import { QuestionStatus, STATUS } from '../../../../constants/qa/status'
import { useRouter } from 'next/router'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { SortDrawer } from '../../../organisms/qa/SortDrawer'
import { CategoryDrawer } from '../../../organisms/qa/CategoryDrawer'
import { SortItem } from '../../../../constants/sort'
import { Question } from '../../../../../entities/qa'

interface Props {
    questions: Question[]
    isLoading: boolean
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    changeStatus: (value: QuestionStatus) => void
    resetCategories: () => void
    title?: string
}
export const Page = ({
    questions,
    isLoading,
    sortQuestions,
    filterQuestions,
    changeStatus,
    resetCategories,
    title,
}: Props) => {
    const { isOpen: isOpenSortDrawer, onOpen: onOpenSortDrawer, onClose: onCloseSortDrawer } = useDisclosure()
    const {
        isOpen: isOpenCategoryDrawer,
        onOpen: onOpenCategoryDrawer,
        onClose: onCloseCategoryDrawer,
    } = useDisclosure()
    const [categoryCount, setCategoryCount] = useState(0)
    const router = useRouter()
    const errorToast = useErrorToast()

    const changeQuestionStatus = (status: QuestionStatus) => {
        changeStatus(status)
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
        onCloseCategoryDrawer()
    }

    const clickReset = () => {
        resetCategories()
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
