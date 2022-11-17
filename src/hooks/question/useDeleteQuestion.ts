import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../../api/req/QuestionReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    questionReq: QuestionReq
    questionId: string
}
export const useDeleteQuestion = (queryOptions?: UseMutationOptions) => {
    const { cacheClear } = useCacheClear()
    const cacheClearQuestion = (userId: string) => {
        cacheClear(QUERY_KEYS.QUESTIONS)
        cacheClear(QUERY_KEYS.QUESTION(userId))
    }
    return { cacheClearQuestion, ...useMutation((questionId: string) => questionService.delete(questionId)) }
}
