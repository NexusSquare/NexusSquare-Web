export type Answer = {
    userId: string
    postUser: {
        nickname: string
        department?: string
        subject?: string
        imageUrl: string
        isDepartmentAnonymous: boolean
    }
    questionId: string
    questionTitle: string
    answerId: string
    content: string
    createdAt: Date
    updatedAt: Date
    imageUrl?: string
    isEdited: boolean
    isBest: boolean
}
