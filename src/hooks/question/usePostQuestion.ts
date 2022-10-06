import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../types/api/req/QuestionReq'
import { User } from '../../types/domain/user'

interface Props {
    questionReq: QuestionReq
    postUser: User
}
export const usePostQuestion = (queryOptions?: UseMutationOptions) => {
    return useMutation(({ questionReq, postUser }: Props) => questionService.save(questionReq, postUser))
}
