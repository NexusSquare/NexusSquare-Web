import { QuestionQuery } from '../../constants/query'
import { Question } from '../../entities/qa/Question'

export interface QuestionRepository {
    findAll(query: QuestionQuery): Promise<Question[]>
    findById(questionId: string): Promise<Question | undefined>
    findByUserId(userId: string): Promise<Question[]>
    save(question: Question): Promise<void>
    update(question: Partial<Question>, questionId: string): Promise<void>
}
