import { Timestamp } from 'firebase-admin/firestore'

export type UserDocument = {
    department: string | null
    subject: string | null
    grade: string
    nickname: string
    imageUrl: string

    updatedAt: Timestamp
    createdAt: Timestamp

    isDepartmentAnonymous: boolean
    point: number
    totalPoint: number
}
