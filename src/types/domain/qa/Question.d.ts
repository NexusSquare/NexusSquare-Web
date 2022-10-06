export type Question = {
    userId: userId
    postUser: {
        nickname: string
        department: string
        subject: string
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
