import { ERROR } from '../../constants/errors'
import { USER_ID } from '../../constants/token'
import { userRepository } from '../../repositories/user/UserRepositoryImpl'
import { UserReq } from '../../api/req/UserReq'
import { User, UserMeta } from '../../entities/user'
import { userFactory, UserParams } from '../../entities/factories/userFactory'
import { userMetaRepository } from '../../repositories/user/meta/UserMetaRepositoryImpl'
import { authRepository } from '../../repositories/auth/AuthRepositoryImpl'
import { UserService } from './userService'

class UserServiceImpl implements UserService {
    async findMyself(): Promise<User> {
        const userId = authRepository.getMyId()
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user = await userRepository.findById(userId)
        if (!user) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return user
    }
    async findById(uid: string): Promise<User> {
        const user = await userRepository.findById(uid)
        if (!user) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return user
    }
    async save(params: UserParams): Promise<{ user: User; userMeta: UserMeta }> {
        const userId = authRepository.getMyId()
        const email = authRepository.getMyEmail()
        if (!userId || !email) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: User = userFactory.create(params, userId)
        await userRepository.save(user)
        const userMeta: UserMeta = userFactory.createForMeta(user, email, params.name)
        await userMetaRepository.save(userMeta)
        return { user, userMeta }
    }
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
    }
}

export const userService = new UserServiceImpl()
