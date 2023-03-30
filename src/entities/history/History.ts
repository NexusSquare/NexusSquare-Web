export type HistoryType = 'ANSWER' | 'QUESTION' | 'BEST_ANSWER'

export type History = {
    historyId: string
    point: number
    createdAt: Date
    type: HistoryType
    postId: string
}
