import { Answer } from '../../entities/qa/Answer'

export interface AnswerRepository {
    findAllByQuestionId(questionId: string): Promise<Answer[]>
    findAllByUserId(userId: string): Promise<Answer[]>
    save(answer: Answer): Promise<void>
    update(answer: Partial<Answer>, answerId: string): Promise<void>
    delete(answerId: string): Promise<void>
}
