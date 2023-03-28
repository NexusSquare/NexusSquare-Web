import { Timestamp } from 'firebase/firestore'

export type Question = {
    documentId: string
    document: {
        questionId: string
        userId: string
        postUser: {
            nickname: string
            department: string | null
            subject: string | null
            imageUrl: string
            isDepartmentAnonymous: boolean
        }
        categories: string[]
        createdAt: Timestamp
        updatedAt: Timestamp
        title: string
        content: string
        ansNum: number
        imageUrl?: string | null
        isEdited: boolean
        status: string
        bestAnswerId: string | null
        biGram: {
            [key: string]: boolean
        }
    }
}
