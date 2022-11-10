import { useDisclosure } from '@chakra-ui/react'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Page'
import { LINKS } from '../../constants/links'
import { STATUS } from '../../constants/qa/status'
import { QACategory, QuestionQuery } from '../../constants/query'
import { SortItem } from '../../constants/sort'
import { useErrorToast } from '../../hooks/errors/useErrorToast'
import { useFetchQuestions } from '../../hooks/question/useFetchQuestion'
import { Question } from '../../types/domain/qa'

type QuestionStatus = keyof typeof STATUS

interface Props {
    questions: Question[]
    isLoading: boolean
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    changeStatus: (value: QuestionStatus) => void
    resetCategories: () => void
}
const QAHome: NextPageWithLayout = () => {
    const initQuestionQuery: QuestionQuery = {
        status: STATUS.NOT_SOLVED,
        orderBy: 'createAt',
        direction: 'desc',
        categories: [],
    }
    const [questionQuery, setQuestionQuery] = useState<QuestionQuery>(initQuestionQuery)
    const { data: questions = [], isLoading } = useFetchQuestions(questionQuery)
    const sortQuestions = (sortItem: SortItem) => {
        const { orderBy, direction } = sortItem
        setQuestionQuery((query) => {
            return { ...query, orderBy, direction }
        })
    }
    const filterQuestions = (categories: QACategory[]) => {
        setQuestionQuery((query) => {
            return { ...query, categories }
        })
    }
    const changeQuestionStatus = (status: QuestionStatus) => {
        setQuestionQuery((query) => {
            return { ...query, status }
        })
    }
    const resetCategories = () => {
        setQuestionQuery((query) => {
            return { ...query, categories: [] }
        })
    }
    return (
        <Page
            questions={questions}
            isLoading={isLoading}
            sortQuestions={sortQuestions}
            filterQuestions={filterQuestions}
            changeStatus={changeQuestionStatus}
            resetCategories={resetCategories}
        />
    )
}

QAHome.getLayout = (page) => {
    return <Layout pageName="Q&Aトップ">{page}</Layout>
}

export default QAHome
