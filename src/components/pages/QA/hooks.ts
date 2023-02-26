import { useCallback, useState } from 'react'
import { QACategory, QuestionQuery } from '../../../constants/query'
import { initQuestionQuery } from './constants'
import { SortItem } from '../../../constants/sort'
import { QuestionStatus } from '../../../constants/qa/status'
import { useSessionStorage } from 'react-use'

export const useSearchQuestionQuery = () => {
    // NOTE: ページバックしたときにクエリが消えないようにsessionに保存
    const [questionQuery, setQuestionQuery] = useSessionStorage('question-query', initQuestionQuery)

    const sortQuestions = useCallback(
        (sortItem: SortItem) => {
            const { orderBy, direction } = sortItem
            setQuestionQuery({ ...questionQuery, orderBy, direction })
        },
        [questionQuery]
    )
    const filterQuestions = useCallback(
        (categories: QACategory[]) => {
            setQuestionQuery({ ...questionQuery, categories })
        },
        [questionQuery]
    )
    const changeQuestionStatus = useCallback(
        (status: QuestionStatus) => {
            setQuestionQuery({ ...questionQuery, status })
        },
        [questionQuery]
    )
    const resetCategories = useCallback(() => {
        setQuestionQuery({ ...questionQuery, categories: [] })
    }, [questionQuery])

    const updatePageNumber = useCallback(
        (page: number) => {
            setQuestionQuery({ ...questionQuery, page })
        },
        [questionQuery]
    )

    const searchByTitle = useCallback(
        (title: string) => {
            setQuestionQuery({ ...questionQuery, title: String(title) })
        },
        [questionQuery]
    )

    return {
        questionQuery,
        sortQuestions,
        filterQuestions,
        changeQuestionStatus,
        resetCategories,
        updatePageNumber,
        searchByTitle,
    } as const
}
