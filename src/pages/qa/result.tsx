import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/QA/Search/Layout'
import { Page } from '../../components/pages/QA/Result/Page'
import { QuestionStatus, STATUS } from '../../constants/qa/status'
import { QACategory, QuestionQuery } from '../../constants/query'
import { SortItem } from '../../constants/sort'
import { useFetchQuestionsByTitle } from '../../hooks/question/useFetchQuestion'

const QAResult: NextPageWithLayout = () => {
    const router = useRouter()
    const isReady = router.isReady
    const title = router.query.title ? String(router.query.title) : undefined
    const initQuestionQuery: QuestionQuery = {
        status: STATUS.NOT_SOLVED,
        orderBy: 'createAt',
        direction: 'desc',
        categories: [],
        title: title,
    }
    const pageName = `${title}の検索結果`
    const [questionQuery, setQuestionQuery] = useState<QuestionQuery>(initQuestionQuery)
    const { data: questions = [], isLoading } = useFetchQuestionsByTitle(questionQuery)
    const questionNum = questions.length
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
    // NOTE routerが準備されるまでに時間がかかるため、タイトル更新を非同期にする
    useEffect(() => {
        if (!title) return
        setQuestionQuery((query: QuestionQuery) => {
            return { ...query, title: String(title) }
        })
    }, [isReady, title])
    return (
        <Layout
            pageName={pageName}
            sortQuestions={sortQuestions}
            filterQuestions={filterQuestions}
            questionNum={questionNum}
        >
            <Page
                questions={questions}
                isLoading={isLoading}
                sortQuestions={sortQuestions}
                filterQuestions={filterQuestions}
                changeStatus={changeQuestionStatus}
                resetCategories={resetCategories}
                title={title}
            />
        </Layout>
    )
}

// QAResult.getLayout = (page) => <Layout pageName="Q&Aトップ">{page}</Layout>

export default QAResult
