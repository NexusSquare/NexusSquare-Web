import { Timestamp } from 'firebase/firestore'

export type HistoryRes = {
    documentId: string
    document: {
        historyId: string
        point: number
        createdAt: Timestamp
        type: string
    }
}
