import { Timestamp } from 'firebase/firestore'
import { USER_ID } from '../constants/token'
import { Answer } from '../entities/qa/Answer'
import { AnswerReq } from '../api/req/AnswerReq'
import { User } from '../entities/user'
import { ERROR } from '../constants/errors'
import { AnswerRes } from '../api/res/AnswerRes'
import { answerRepository } from '../repositories/answer/answerRepositoryImpl'
import { answerFactory } from '../entities/factories/answerFactory'

export class AnswerService {
    public findByQuestionId = async (questionId: string): Promise<Answer[]> => {
        return await answerRepository.findByQuestionId(questionId)
    }
    public findByUserId = async (userId: string): Promise<Answer[]> => {
        return await answerRepository.findByUserId(userId)
    }
    public save = async (answerReq: AnswerReq, postUser: User): Promise<void> => {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const answer: Answer = answerFactory.create({
            userId: userId,
            ...answerReq,
            postUser: {
                nickname: postUser.nickname,
                department: postUser.department,
                subject: postUser.subject,
                imageUrl: postUser.imageUrl,
                isDepartmentAnonymous: postUser.isDepartmentAnonymous,
            },
        })

        return answerRepository.save(answer)
    }
    public update = async (answerReq: AnswerReq, answerId: string): Promise<void> => {
        const answer: Partial<Answer> = {
            updatedAt: new Date(),
            isEdited: true,
            ...answerReq,
        }
        return answerRepository.update(answer, answerId)
    }
    public delete = async (answerId: string): Promise<void> => {
        return answerRepository.delete(answerId)
    }
}

export const answerService = new AnswerService()
