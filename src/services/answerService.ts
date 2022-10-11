import { Timestamp } from 'firebase/firestore'
import { USER_ID } from '../constants/token'
import { answerRepository } from '../repositories/answerRepository'
import { Answer } from '../types/domain/qa/Answer'
import { AnswerReq } from '../types/api/req/AnswerReq'
import { User } from '../types/domain/user'

export const answerService = {
    async findByQuestionId(questionId: string): Promise<Answer[]> {
        return answerRepository.findByQuestionId(questionId)
    },
    async findByUserId(userId: string): Promise<Answer[]> {
        return answerRepository.findByUserId(userId)
    },
    async save(answerReq: AnswerReq, postUser: User): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        const answer: Omit<Answer, 'answerId'> = {
            questionId: answerReq.questionId,
            userId: userId!,
            postUser: {
                nickname: postUser.nickname,
                department: postUser.isDepartmentAnonymous ? null : postUser.department,
                subject: postUser.isDepartmentAnonymous ? null : postUser.subject,
                imageUrl: postUser.imageUrl,
                isDepartmentAnonymous: postUser.isDepartmentAnonymous,
            },
            createAt: Timestamp.now(),
            updateAt: Timestamp.now(),
            content: answerReq.content,
            imageUrl: answerReq.imageUrl ? answerReq.imageUrl : null,
            isEdited: false,
        }
        return answerRepository.save(answer)
    },
}
