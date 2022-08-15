type User = {
    id: string
    department: string
    subject: string
    grade: number
    firstname: string
    lastname: string
    firstnameFurigana: string
    lastnameFurigana: string
    point: number
    updateAt: string
    imageUrl?: string
    isNameAnonymous: boolean
    isDepartmentAnonymous: boolean
}
export default User
