import { Timestamp } from 'firebase/firestore'

export type UserRes = {
    documentId: string
    document: {
        userId: string
        department: string
        subject: string
        grade: number
        nickname: string
        imageUrl: string
        updateAt: Timestamp
        createAt: Timestamp
        isDepartmentAnonymous: boolean
        point: number
        totalPoint: number
    }
}