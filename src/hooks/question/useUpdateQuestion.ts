import { useMutation, UseMutationOptions } from 'react-query'
import { questionService } from '../../services/questionService'
import { QuestionReq } from '../../api/req/QuestionReq'
import { QUERY_KEYS } from '../react-query/query'
import { useCacheClear } from '../react-query/useCacheClear'

interface Props {
    questionReq: QuestionReq
    questionId: string
}

interface BestAnswerProps {
    answerId: string
    questionId: string
}
export const useUpdateQuestion = (queryOptions?: UseMutationOptions) => {
    const { cacheClearForKey } = useCacheClear()
    const cacheClearQuestion = (userId: string) => {
        cacheClearForKey(QUERY_KEYS.QUESTIONS)
        cacheClearForKey(QUERY_KEYS.QUESTION(userId))
    }
    return {
        cacheClearQuestion,
        ...useMutation(({ questionReq, questionId }: Props) => questionService.update(questionReq, questionId)),
    }
}

export const useBestAnswer = (queryOptions?: UseMutationOptions) => {
    const { cacheClearForKey } = useCacheClear()
    const cacheClearQuestion = (userId: string) => {
        cacheClearForKey(QUERY_KEYS.QUESTIONS)
        cacheClearForKey(QUERY_KEYS.QUESTION(userId))
    }
    return {
        cacheClearQuestion,
        ...useMutation(({ answerId, questionId }: BestAnswerProps) =>
            questionService.declareBestAnswer(answerId, questionId)
        ),
    }
}
