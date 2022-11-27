import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../api/req/QuestionReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'
import { useUser } from '../../store/atom'

interface Props {
    questionReq: QuestionReq
    questionId: string
}
export const useDeleteQuestion = (queryOptions?: UseMutationOptions) => {
    const { cacheClearForKey } = useCacheClear()

    const cacheClearQuestion = async (userId: string) => {
        cacheClearForKey(QUERY_KEYS.QUESTIONS)
        cacheClearForKey(QUERY_KEYS.QUESTION(userId))
    }
    return { cacheClearQuestion, ...useMutation((questionId: string) => questionService.delete(questionId)) }
}
