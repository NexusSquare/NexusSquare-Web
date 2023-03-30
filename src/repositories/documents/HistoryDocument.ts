import { Timestamp } from 'firebase-admin/firestore'

export type HistoryDocument = {
    point: number
    createdAt: Timestamp
    type: string
    postId: string
}
