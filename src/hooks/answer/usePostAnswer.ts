import { useMutation, UseMutationOptions } from 'react-query'
import { answerService } from '../../services/answerService'
import { AnswerReq } from '../../types/api/req'
import { User } from '../../types/domain/user'

interface Props {
    answerReq: AnswerReq
    postUser: User
}
export const usePostAnswer = (queryOptions?: UseMutationOptions) => {
    return useMutation(({ answerReq, postUser }: Props) => answerService.save(answerReq, postUser))
}
