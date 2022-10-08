export type Question = {
    questionId: string
    userId: string
    postUser: {
        nickname: string
        department: string | null
        subject: string | null
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    categories: string[]
    createAt: timestamp
    updateAt: timestamp
    title: string
    content: string
    ansNum: number
    imageUrl?: string | null
    isEdited: boolean
    status: string
}
