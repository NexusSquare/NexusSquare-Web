import { Timestamp } from 'firebase/firestore'
import { bigram } from 'n-gram'
import { ERROR } from '../constants/errors'
import { Direction, OrderBy, QuestionQuery } from '../constants/query'
import { USER_ID } from '../constants/token'
import { QuestionReq } from '../api/req'
import { Question } from '../entities/qa/Question'
import { User } from '../entities/user'
import { questionRepository } from '../repositories/question/QuestionRepositoryImpl'
import { questionFactory } from '../entities/factories/questionFactory'
import { QuestionStatus } from '../entities/qa/QuestionStatus'

export class QuestionService {
    private readonly NOT_FOUND_ERROR_MESSAGE = '質問が見つかりませんでした。'

    public async find(queryQuestion: QuestionQuery): Promise<Question[]> {
        return questionRepository.findAll(queryQuestion)
    }
    public async findById(id: string): Promise<Question> {
        const question = await questionRepository.findById(id)
        if (!question) {
            throw new Error(this.NOT_FOUND_ERROR_MESSAGE)
        }
        return question
    }
    public async findByTitle(queryQuestion: QuestionQuery): Promise<Question[]> {
        const question = await questionRepository.findByTitle(queryQuestion)
        return question.sort((a, b) => questionSort(a, b, queryQuestion.orderBy, queryQuestion.direction))
    }
    public async findByUserId(userId: string): Promise<Question[]> {
        return questionRepository.findByUserId(userId)
    }
    public async save(questionReq: QuestionReq, postUser: User): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const question = questionFactory.create({
            userId: userId,
            ...questionReq,
            postUser: {
                nickname: postUser.nickname,
                department: postUser.department,
                subject: postUser.subject,
                imageUrl: postUser.imageUrl,
                isDepartmentAnonymous: postUser.isDepartmentAnonymous,
            },
        })
        return questionRepository.save(question)
    }
    public async update(questionReq: QuestionReq, questionId: string): Promise<void> {
        const question = questionFactory.update({
            ...questionReq,
        })
        return questionRepository.update(question, questionId)
    }
    public async declareBestAnswer(answerId: string, questionId: string): Promise<void> {
        const question: Partial<Question> = {
            bestAnswerId: answerId,
            status: QuestionStatus.SOLVED,
        }
        return questionRepository.update(question, questionId)
    }
    public async delete(questionId: string): Promise<void> {
        return questionRepository.delete(questionId)
    }
}

// HACK:Firebaseの仕様上タイトル検索をしてソートをすることができないため、フロントでソートを行う。
const questionSort = (q1: Question, q2: Question, orderBy: OrderBy, direction: Direction) => {
    const toNumDirection = direction === 'desc' ? 1 : -1
    if (q1[orderBy] < q2[orderBy]) return 1 * toNumDirection
    if (q1[orderBy] > q2[orderBy]) return -1 * toNumDirection
    return 0
}

export const questionService = new QuestionService()
