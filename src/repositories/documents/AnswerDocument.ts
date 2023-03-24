import { Timestamp } from 'firebase-admin/firestore'

export type AnswerDocument = {
    userId: string
    postUser: {
        nickname: string
        department: string | null
        subject: string | null
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    questionId: string
    questionTitle: string
    content: string
    createdAt: Timestamp
    updatedAt: Timestamp
    imageUrl: string | null
    isEdited: boolean
    isBest: boolean
}
