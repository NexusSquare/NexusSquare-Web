import { Timestamp } from 'firebase/firestore'
import { USER_ID } from '../constants/token'
import { Answer } from '../../entities/qa/Answer'
import { AnswerReq } from '../../api/req/AnswerReq'
import { User } from '../../entities/user'
import { ERROR } from '../constants/errors'
import { answerRepository } from '../repositories/answerRepository'
import { AnswerRes } from '../../api/res/AnswerRes'

export class AnswerService {
    public findByQuestionId = async (questionId: string): Promise<Answer[]> => {
        return (await answerRepository.findByQuestionId(questionId)).map((res) => this.convert(res))
    }
    public findByUserId = async (userId: string): Promise<Answer[]> => {
        return (await answerRepository.findByUserId(userId)).map((res) => this.convert(res))
    }
    public save = async (answerReq: AnswerReq, postUser: User): Promise<void> => {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const answer: Omit<Answer, 'answerId'> = {
            questionId: answerReq.questionId,
            questionTitle: answerReq.questionTitle,
            userId: userId,
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
            isBest: false,
        }
        return answerRepository.save(answer)
    }
    public update = async (answerReq: AnswerReq, answerId: string): Promise<void> => {
        const answer: Partial<Answer> = {
            updateAt: Timestamp.now(),
            isEdited: true,
            ...answerReq,
        }
        return answerRepository.update(answer, answerId)
    }
    public delete = async (answerId: string): Promise<void> => {
        return answerRepository.delete(answerId)
    }
    private convert = (answerRes: AnswerRes): Answer => {
        const { document: d, documentId } = answerRes
        const answer: Answer = {
            answerId: documentId,
            questionId: d.questionId,
            questionTitle: d.questionTitle,
            userId: d.userId,
            postUser: d.postUser,
            createAt: d.createAt,
            updateAt: d.updateAt,
            content: d.content,
            imageUrl: d.imageUrl ?? undefined,
            isEdited: d.isEdited,
            isBest: d.isBest,
        }
        return answer
    }
}

export const answerService = new AnswerService()
