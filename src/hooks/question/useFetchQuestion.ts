import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_KEYS } from '../react-query/query'
import { questionService } from '../../services/questionService'
import { Question } from '../../types/domain/qa/Question'
import { DEFAULT_QUERY_OPTIONS } from '../react-query/config'
import { QuestionQuery } from '../../constants/query'
import { STATUS } from '../../constants/qa/status'

export const useFetchQuestions = (queryQuestion: QuestionQuery, queryOptions?: UseQueryOptions<Question[]>) => {
    return useQuery<Question[]>([QUERY_KEYS.QUESTIONS, { queryQuestion }], () => questionService.find(queryQuestion), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchQuestion = (questionId: string, queryOptions?: UseQueryOptions<Question>) => {
    return useQuery<Question>([QUERY_KEYS.QUESTION(questionId)], () => questionService.findById(questionId), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchQuestionsByUserId = (userId: string, queryOptions?: UseQueryOptions<Question[]>) => {
    return useQuery<Question[]>([QUERY_KEYS.QUESTION(userId)], () => questionService.findByUserId(userId), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchQuestionsByTitle = (title: string, queryOptions?: UseQueryOptions<Question[]>) => {
    return useQuery<Question[]>([QUERY_KEYS.QUESTION(title)], () => questionService.findByTitle(title), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}
