type UpdateUser = {
    department: string
    subject: string
    grade: number
    firstname: string
    lastname: string
    firstnameFurigana: string
    lastnameFurigana: string
    imageUrl?: string
    isNameAnonymous: boolean
    isDepartmentAnonymous: boolean
}
export default UpdateUser
