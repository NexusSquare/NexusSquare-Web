export type User = {
    department?: string | null
    subject?: string | null
    grade?: number | null
    nickname: string
    imageUrl: string
    updateAt: Timestamp
    createAt: Timestamp
    isDepartmentAnonymous: boolean
    point: number
    totalPoint: number
}
