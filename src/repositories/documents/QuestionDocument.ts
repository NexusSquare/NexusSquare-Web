import { Timestamp } from 'firebase/firestore'

export type QuestionDocument = {
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
    deadlineDate: Timestamp
    title: string
    content: string
    ansNum: number
    isEdited: boolean
    status: string
    imageUrl: string | null
    bestAnswerId: string | null
    biGram: {
        [key: string]: boolean
    }
}
