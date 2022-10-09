import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../types/api/req/QuestionReq'

interface Props {
    questionReq: QuestionReq
    questionId: string
}
export const useDeleteQuestion = (queryOptions?: UseMutationOptions) => {
    return useMutation((questionId: string) => questionService.delete(questionId))
}
