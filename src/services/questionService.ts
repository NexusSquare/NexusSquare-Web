import { Timestamp } from 'firebase/firestore'
import { STATUS } from '../constants/qa/status'
import { USER_ID } from '../constants/token'
import { questionRepository } from '../repositories/questionRepository'
import { QuestionReq } from '../types/api/req/QuestionReq'
import { Question } from '../types/domain/qa/Question'
import { User } from '../types/domain/user'

export const questionService = {
    async save(questionReq: QuestionReq, postUser: User): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        const question: Question = {
            userId: userId!,
            postUser: {
                nickname: postUser.nickname,
                department: postUser.department,
                subject: postUser.subject,
                imageUrl: postUser.imageUrl,
                isDepartmentAnonymous: postUser.isDepartmentAnonymous,
            },
            categories: convertCategories(questionReq.category1, questionReq.category2),
            createAt: Timestamp.now(),
            updateAt: Timestamp.now(),
            title: questionReq.title,
            content: questionReq.content,
            ansNum: 0,
            imageUrl: questionReq.imageUrl ? questionReq.imageUrl : null,
            isEdited: false,
            status: STATUS.NOT_SOLVED,
        }
        return questionRepository.save(question)
    },
}

// NOTE firebaseの検索に対応するため、配列に変換する必要がある
const convertCategories = (cat1: string, cat2?: string): string[] => {
    if (!cat2) return [cat1]
    return [cat1, cat2]
}
