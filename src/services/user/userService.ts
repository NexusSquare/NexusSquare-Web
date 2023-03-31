import { ERROR } from '../../constants/errors'
import { USER_ID } from '../../constants/token'
import { userRepository } from '../../repositories/user/UserRepositoryImpl'
import { UserReq } from '../../api/req/UserReq'
import { User, UserMeta } from '../../entities/user'
import { userFactory } from '../../entities/factories/userFactory'
import { userMetaRepository } from '../../repositories/user/meta/UserMetaRepositoryImpl'

export const userService = {
    async findOne(uid: string): Promise<User> {
        const user = await userRepository.findById(uid)
        if (!user) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return user
    },
    async save(userReq: UserReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: User = userFactory.create(userReq, userId)
        return userRepository.save(user)
    },
    async update(userReq: Partial<UserReq>): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: Partial<User> = {
            ...userReq,
            updatedAt: new Date(),
        }
        userRepository.update(user, userId)

        const userMeta: Partial<UserMeta> = {
            department: userReq.department,
            subject: userReq.subject,
            grade: userReq.grade,
        }
        userMetaRepository.update(userMeta, userId)
    },
}
