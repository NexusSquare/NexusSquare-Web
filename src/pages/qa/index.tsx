import { useDisclosure } from '@chakra-ui/react'
import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '../../components/layouts/QA/Search/Layout'
import { Page } from '../../components/pages/QA/Page'
import { STATUS } from '../../constants/qa/status'
import { QACategory, QuestionQuery } from '../../constants/query'
import { SortItem } from '../../constants/sort'
import { useErrorToast } from '../../hooks/errors/useErrorToast'
import { useFetchQuestions } from '../../hooks/question/useFetchQuestion'
import { Question } from '../../types/domain/qa'

type QuestionStatus = keyof typeof STATUS

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
        <Layout
            pageName="Q&Aトップ"
            sortQuestions={sortQuestions}
            filterQuestions={filterQuestions}
            questionNum={questions.length}
        >
            <Page
                questions={questions}
                isLoading={isLoading}
                sortQuestions={sortQuestions}
                filterQuestions={filterQuestions}
                changeStatus={changeQuestionStatus}
                resetCategories={resetCategories}
            />
        </Layout>
    )
}

// QAHome.getLayout = (page) => {
//     return <Layout pageName="Q&Aトップ">{page}</Layout>
// }

export default QAHome
