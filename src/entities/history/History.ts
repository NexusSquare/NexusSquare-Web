import { Timestamp } from 'firebase/firestore'

export type HistoryType = 'ANSWER' | 'QUESTION' | 'BEST_ANSWER'

export type History = {
    historyId: string
    point: number
    createdAt: Timestamp
    type: HistoryType
}
