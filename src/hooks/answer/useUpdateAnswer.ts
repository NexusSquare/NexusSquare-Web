import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../../api/req/AnswerReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    answerReq: AnswerReq
    answerId: string
}
export const useUpdateAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClear } = useCacheClear()
    const cacheClearAnswer = (userId?: string, questionId?: string) => {
        cacheClear(QUERY_KEYS.ANSWER(userId))
        cacheClear(QUERY_KEYS.ANSWER(questionId))
    }
    return {
        cacheClearAnswer,
        ...useMutation(({ answerReq, answerId }: Props) => answerService.update(answerReq, answerId)),
    }
}
