import { Timestamp } from 'firebase/firestore'

export type User = {
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
