import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../types/api/req/QuestionReq'

interface Props {
    questionReq: QuestionReq
    questionId: string
}
export const useUpdateQuestion = (queryOptions?: UseMutationOptions) => {
    return useMutation(({ questionReq, questionId }: Props) => questionService.update(questionReq, questionId))
}
