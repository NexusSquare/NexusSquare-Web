import { Timestamp } from 'firebase/firestore'

export type Report = {
    postId: string
    userId: string
    type: string
    reason: string
    createAt: Timestamp
}
