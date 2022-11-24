import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../api/req'
import { User } from '../../entities/user'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    questionReq: QuestionReq
    postUser: User
}
export const usePostQuestion = (queryOptions?: UseMutationOptions) => {
    const { cacheClear } = useCacheClear()
    const cacheClearQuestion = (userId: string) => {
        cacheClear(QUERY_KEYS.QUESTIONS)
        cacheClear(QUERY_KEYS.QUESTION(userId))
    }
    return {
        cacheClearQuestion,
        ...useMutation(({ questionReq, postUser }: Props) => questionService.save(questionReq, postUser)),
    }
}
