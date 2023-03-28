export type UserDocument = {
  department: string | null
  subject: string | null
  grade: string
  nickname: string
  imageUrl: string
  updatedAt: Date
  createdAt: Date
  isDepartmentAnonymous: boolean
  point: number
  totalPoint: number
}
