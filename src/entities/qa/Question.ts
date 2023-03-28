import { Timestamp } from 'firebase/firestore'

export type Question = {
    questionId: string
    userId: string
    postUser: {
        nickname: string
        department: string | undefined
        subject: string | undefined
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    categories: string[]
    createdAt: Date
    updatedAt: Date
    deadlineDate: Date
    title: string
    content: string
    ansNum: number
    imageUrl?: string | undefined
    isEdited: boolean
    status: string
    bestAnswerId: string | undefined
    biGram: {
        [key: string]: boolean
    }
}
