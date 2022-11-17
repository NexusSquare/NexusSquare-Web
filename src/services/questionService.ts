import { Timestamp } from 'firebase/firestore'
import { bigram } from 'n-gram'
import { ERROR } from '../constants/errors'
import { STATUS } from '../constants/qa/status'
import { Direction, OrderBy, QuestionQuery } from '../constants/query'
import { USER_ID } from '../constants/token'
import { questionRepository } from '../repositories/questionRepository'
import { QuestionReq } from '../../api/req'
import { Question } from '../../entities/qa/Question'
import { User } from '../../entities/user'

export const questionService = {
    async find(queryQuestion: QuestionQuery): Promise<Question[]> {
        return questionRepository.find(queryQuestion)
    },
    async findById(id: string): Promise<Question> {
        return questionRepository.findById(id)
    },
    async findByTitle(queryQuestion: QuestionQuery): Promise<Question[]> {
        const question = await questionRepository.findByTitle(queryQuestion)
        console.log(question)
        return question.sort((a, b) => questionSort(a, b, queryQuestion.orderBy, queryQuestion.direction))
    },
    async findByUserId(userId: string): Promise<Question[]> {
        return questionRepository.findByUserId(userId)
    },
    async save(questionReq: QuestionReq, postUser: User): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const gram: string[] = bigram(questionReq.title)
        const question: Omit<Question, 'questionId'> = {
            userId: userId,
            postUser: {
                nickname: postUser.nickname,
                department: postUser.isDepartmentAnonymous ? null : postUser.department,
                subject: postUser.isDepartmentAnonymous ? null : postUser.subject,
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
            bestAnswerId: null,
            biGram: toBiGramObject(gram),
        }
        return questionRepository.save(question)
    },
    async update(questionReq: QuestionReq, questionId: string): Promise<void> {
        const gram: string[] = bigram(questionReq.title)
        const question: Partial<Question> = {
            updateAt: Timestamp.now(),
            categories: convertCategories(questionReq.category1, questionReq.category2),
            title: questionReq.title,
            content: questionReq.content,
            imageUrl: questionReq.imageUrl ? questionReq.imageUrl : null,
            isEdited: true,
            biGram: toBiGramObject(gram),
        }
        return questionRepository.update(question, questionId)
    },
    async declareBestAnswer(answerId: string, questionId: string): Promise<void> {
        const question: Partial<Question> = {
            bestAnswerId: answerId,
            status: STATUS.SOLVED,
        }
        return questionRepository.update(question, questionId)
    },
    async delete(questionId: string): Promise<void> {
        return questionRepository.delete(questionId)
    },
}

// NOTE firebaseの検索に対応するため、配列に変換する必要がある
const convertCategories = (cat1: string, cat2?: string): string[] => {
    if (!cat2) return [cat1]
    return [cat1, cat2]
}

const toBiGramObject = (grams: string[]) => {
    let obj = {}
    grams.forEach((gram: string) => {
        obj = { ...obj, [gram]: true }
    })
    return obj
}
// HACK:Firebaseの仕様上タイトル検索をしてソートをすることができないため、フロントでソートを行う。
const questionSort = (q1: Question, q2: Question, orderBy: OrderBy, direction: Direction) => {
    console.log(q1, q2)
    const toNumDirection = direction === 'desc' ? 1 : -1
    if (q1[orderBy] < q2[orderBy]) return 1 * toNumDirection
    if (q1[orderBy] > q2[orderBy]) return -1 * toNumDirection
    return 0
}
