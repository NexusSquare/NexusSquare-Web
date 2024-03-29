import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../api/req'
import { User } from '../../entities/user'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    answerReq: AnswerReq
    postUser: User
}
export const usePostAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClearForKey } = useCacheClear()
    const cacheClearAnswer = async (userId: string, questionId: string) => {
        cacheClearForKey(QUERY_KEYS.ANSWER(userId))
        cacheClearForKey(QUERY_KEYS.ANSWER(questionId))
    }
    return {
        cacheClearAnswer,
        ...useMutation(({ answerReq, postUser }: Props) => answerService.save(answerReq, postUser)),
    }
}
