import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../api/req/AnswerReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    answerReq: AnswerReq
    answerId: string
}
export const useDeleteAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClearForKey } = useCacheClear()
    const cacheClearAnswer = async (userId: string, questionId: string) => {
        cacheClearForKey(QUERY_KEYS.ANSWER(userId))
        cacheClearForKey(QUERY_KEYS.ANSWER(questionId))
    }
    return { cacheClearAnswer, ...useMutation((answerId: string) => answerService.delete(answerId)) }
}
