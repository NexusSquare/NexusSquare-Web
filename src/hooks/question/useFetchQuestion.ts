import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_KEYS } from '../../constants/query'
import { questionService } from '../../services/questionService'
import { Question } from '../../types/domain/qa/Question'

export const useFetchQuestions = (queryOptions?: UseQueryOptions<Question[]>) => {
    return useQuery<Question[]>([QUERY_KEYS.QUESTIONS], () => questionService.find(), {
        ...queryOptions,
    })
}

export const useFetchQuestion = (questionId: string, queryOptions?: UseQueryOptions<Question>) => {
    return useQuery<Question>([QUERY_KEYS.QUESTION(questionId)], () => questionService.findById(questionId), {
        ...queryOptions,
    })
}

export const useFetchQuestionsByUserId = (userId: string, queryOptions?: UseQueryOptions<Question[]>) => {
    return useQuery<Question[]>([QUERY_KEYS.QUESTION(userId)], () => questionService.findByUserId(userId), {
        ...queryOptions,
    })
}
