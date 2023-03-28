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
    const { cacheClearForKey } = useCacheClear()
    const cacheClearQuestion = async (userId: string) => {
        cacheClearForKey(QUERY_KEYS.QUESTIONS)
        cacheClearForKey(QUERY_KEYS.QUESTION(userId))
    }
    return {
        cacheClearQuestion,
        ...useMutation(({ questionReq, postUser }: Props) => questionService.save(questionReq, postUser)),
    }
}
