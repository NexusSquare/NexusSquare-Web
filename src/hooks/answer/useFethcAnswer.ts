import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_KEYS } from '../../constants/query'
import { answerService } from '../../services/answerService'
import { Answer } from '../../types/domain/qa/Answer'
import { DEFAULT_QUERY_OPTIONS } from '../react-query-config/config'

export const useFetchAnswersByQuestionId = (questionId: string, queryOptions?: UseQueryOptions<Answer[]>) => {
    return useQuery<Answer[]>([QUERY_KEYS.ANSWER(questionId)], () => answerService.findByQuestionId(questionId), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchAnswersByUserId = (userId: string, queryOptions?: UseQueryOptions<Answer[]>) => {
    return useQuery<Answer[]>([QUERY_KEYS.ANSWER(userId)], () => answerService.findByUserId(userId), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}
