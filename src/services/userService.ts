import { Timestamp } from 'firebase/firestore'
import { ERROR } from '../constants/errors'
import { DEFAULT_AVATAR_IMAGE_URL } from '../constants/image'
import { USER_ID } from '../constants/token'
import { userRepository } from '../repositories/userRepoisitory'
import { UserReq } from '../types/api/req/UserReq'
import { User } from '../types/domain/user'

export const userService = {
    async findOne(uid: string): Promise<User | undefined> {
        const user = userRepository.findOne(uid)
        if (!user) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return user
    },
    async save(userReq: UserReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: Omit<User, 'userId'> = {
            department: userReq.department,
            subject: userReq.subject,
            grade: userReq.grade,
            nickname: userReq.nickname,
            imageUrl: userReq.imageUrl ? userReq.imageUrl : DEFAULT_AVATAR_IMAGE_URL,
            updateAt: Timestamp.now(),
            createAt: Timestamp.now(),
            isDepartmentAnonymous: userReq.isDepartmentAnonymous,
            point: 0,
            totalPoint: 0,
        }
        return userRepository.save(user, userId)
    },
    async update(userReq: Partial<UserReq>): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: Partial<User> = {
            ...userReq,
            updateAt: Timestamp.now(),
        }
        return userRepository.update(user, userId)
    },
}
