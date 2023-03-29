import { DEFAULT_AVATAR_IMAGE_URL } from '../../constants/image'
import { User, UserMeta } from '../user'

export type UserParams = {
    department: string
    subject: string
    grade: string
    nickname: string
    imageUrl?: string
    isDepartmentAnonymous: boolean
    name: string
}

export const userFactory = {
    create(params: UserParams, id: string): User {
        return {
            userId: id,
            department: params.department,
            subject: params.subject,
            grade: params.grade,
            nickname: params.nickname,
            imageUrl: params.imageUrl ?? DEFAULT_AVATAR_IMAGE_URL,
            updatedAt: new Date(),
            createdAt: new Date(),
            isDepartmentAnonymous: params.isDepartmentAnonymous,
            point: 0,
            totalPoint: 0,
        }
    },
    createForMeta(user: User, email: string, name: string): UserMeta {
        return {
            userId: user.userId,
            department: user.department,
            subject: user.subject,
            grade: user.grade,
            email: email,
            name: name,
        }
    },
}
