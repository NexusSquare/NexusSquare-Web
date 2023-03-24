import { Timestamp } from 'firebase/firestore'

export type AnswerRes = {
    documentId: string
    document: {
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
        answerId: string
        content: string
        createdAt: Timestamp
        updatedAt: Timestamp
        imageUrl?: string | null
        isEdited: boolean
        isBest: boolean
    }
}
