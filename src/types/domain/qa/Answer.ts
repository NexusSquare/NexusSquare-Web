import { Timestamp } from 'firebase/firestore'

export type Answer = {
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
    createAt: Timestamp
    updateAt: Timestamp
    imageUrl?: string | null
    isEdited: boolean
    isBest: boolean
}
