import { Box, Radio, RadioGroup, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
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
import { Question } from '../../../../entities/qa'
import { QACategory } from '../../../constants/query'

type QuestionStatus = keyof typeof STATUS

interface Props {
    questions: Question[]
    isLoading: boolean
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    changeStatus: (value: QuestionStatus) => void
    resetCategories: () => void
}

export const Page = ({
    questions,
    isLoading,
    sortQuestions,
    filterQuestions,
    changeStatus,
    resetCategories,
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
                <QACardList questions={questions} isLoading={isLoading} changeStatus={changeStatus} />
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
