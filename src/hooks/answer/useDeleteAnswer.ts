import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../types/api/req/AnswerReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    answerReq: AnswerReq
    answerId: string
}
export const useDeleteAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClear } = useCacheClear()
    const cacheClearAnswer = (userId: string) => {
        cacheClear(QUERY_KEYS.ANSWER(userId))
    }
    return { cacheClearAnswer, ...useMutation((answerId: string) => answerService.delete(answerId)) }
}
