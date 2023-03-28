import { Answer } from '../../entities/qa/Answer'

export interface AnswerRepository {
    findByQuestionId(questionId: string): Promise<Answer[]>
    findByUserId(userId: string): Promise<Answer[]>
    save(answer: Answer): Promise<void>
    update(answer: Partial<Answer>, answerId: string): Promise<void>
    delete(answerId: string): Promise<void>
}
