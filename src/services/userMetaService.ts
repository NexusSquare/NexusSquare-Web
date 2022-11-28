import { ERROR } from '../constants/errors'
import { EMAIL, USER_ID } from '../constants/token'
import { userMetaRepository } from '../repositories/userMetaRepository'
import { UserReq } from '../api/req/UserReq'
import { UserMeta } from '../entities/user'

export const userMetaService = {
    async findOne(uid: string): Promise<UserMeta | undefined> {
        const userMeta = userMetaRepository.findOne(uid)
        if (!userMeta) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return userMeta
    },
    async save(userReq: UserReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const user: UserMeta = {
            department: userReq.department,
            subject: userReq.subject,
            grade: userReq.grade,
            name: userReq.name,
            email: sessionStorage.getItem(EMAIL)!,
        }
        return userMetaRepository.save(user, userId)
    },
}
