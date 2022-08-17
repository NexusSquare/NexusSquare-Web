type PostUser = {
    department: string
    subject: string
    grade: number
    firstname: string
    lastname: string
    firstnameFurigana: string
    lastnameFurigana: string
    point: number
    mailAddress: string
    imageUrl?: string
    isNameAnonymous: boolean
    isDepartmentAnonymous: boolean
}
export default PostUser
