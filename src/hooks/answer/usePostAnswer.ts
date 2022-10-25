import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../types/api/req'
import { User } from '../../types/domain/user'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    answerReq: AnswerReq
    postUser: User
}
export const usePostAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClear } = useCacheClear()
    const cacheClearAnswer = (userId?: string, questionId?: string) => {
        cacheClear(QUERY_KEYS.ANSWER(userId))
        cacheClear(QUERY_KEYS.ANSWER(questionId))
    }
    return {
        cacheClearAnswer,
        ...useMutation(({ answerReq, postUser }: Props) => answerService.save(answerReq, postUser)),
    }
}
