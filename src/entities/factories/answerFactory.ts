import { Answer } from '../qa/Answer'

export type answerParams = {
    userId: string
    postUser: {
        nickname: string
        department?: string
        subject?: string
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    questionId: string
    questionTitle: string
    content: string
    imageUrl?: string
}

export const answerFactory = {
    create: (params: answerParams): Answer => {
        return {
            answerId: '',
            userId: params.userId,
            postUser: {
                nickname: params.postUser.nickname,
                department: params.postUser.isDepartmentAnonymous ? undefined : params.postUser.department,
                subject: params.postUser.isDepartmentAnonymous ? undefined : params.postUser.subject,
                imageUrl: params.postUser.imageUrl,
                isDepartmentAnonymous: params.postUser.isDepartmentAnonymous,
            },
            questionId: params.questionId,
            questionTitle: params.questionTitle,
            content: params.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            imageUrl: params.imageUrl,
            isEdited: false,
            isBest: false,
        }
    },
}
