import { bigram } from 'n-gram'
import { Question } from '../qa/Question'
import { QuestionStatus } from '../../constants/qa/status'

export type QuestionParams = {
    userId: string
    postUser: {
        nickname: string
        department?: string
        subject?: string
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    category1: string
    category2?: string
    title: string
    content: string
    imageUrl?: string
}

export const questionFactory = {
    create: (params: QuestionParams): Question => {
        return {
            questionId: '',
            userId: params.userId,
            postUser: {
                nickname: params.postUser.nickname,
                department: params.postUser.isDepartmentAnonymous ? undefined : params.postUser.department,
                subject: params.postUser.isDepartmentAnonymous ? undefined : params.postUser.subject,
                imageUrl: params.postUser.imageUrl,
                isDepartmentAnonymous: params.postUser.isDepartmentAnonymous,
            },
            categories: convertCategories(params.category1, params.category2),
            createdAt: new Date(),
            updatedAt: new Date(),
            deadlineDate: createDeadlineDate(),
            title: params.title,
            content: params.content,
            ansNum: 0,
            imageUrl: params.imageUrl,
            isEdited: false,
            status: QuestionStatus.OPEN,
            bestAnswerId: undefined,
            biGram: toBiGramObject(bigram(params.title)),
        }
    },

    update(params: Partial<QuestionParams>): Partial<Question> {
        return {
            updatedAt: new Date(),
            categories: convertCategories(params.category1, params.category2),
            title: params.title,
            content: params.content,
            imageUrl: params.imageUrl,
            isEdited: true,
            biGram: toBiGramObject(bigram(params.title)),
        }
    },
}

const createDeadlineDate = () => {
    const deadlineDate = new Date()
    deadlineDate.setDate(deadlineDate.getDate() + 14)
    return deadlineDate
}

// NOTE firebaseの検索に対応するため、配列に変換する必要がある
const convertCategories = (cat1?: string, cat2?: string): string[] => {
    if (!cat1) return []
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
