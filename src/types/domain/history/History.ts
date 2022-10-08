import { Timestamp } from 'firebase/firestore'

export type History = {
    historyId: string
    point: number
    createAt: Timestamp
    type: string
}
