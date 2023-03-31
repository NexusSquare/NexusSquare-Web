import { useQuery, UseQueryOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { Answer } from '../../entities/qa/Answer'
import { DEFAULT_QUERY_OPTIONS } from '../react-query/config'

const QUERY_KEYS = {
    BY_QUESTION_ID: (id: string) => `answer-${id}`,
    BY_USER_ID: (id: string) => `answer-${id}`,
}
export const useFetchAnswersByQuestionId = (questionId: string, queryOptions?: UseQueryOptions<Answer[]>) => {
    return useQuery<Answer[]>(
        [QUERY_KEYS.BY_QUESTION_ID(questionId)],
        () => answerService.findByQuestionId(questionId),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}

export const useFetchAnswersByUserId = (userId: string, queryOptions?: UseQueryOptions<Answer[]>) => {
    return useQuery<Answer[]>([QUERY_KEYS.BY_USER_ID(userId)], () => answerService.findByUserId(userId), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}
