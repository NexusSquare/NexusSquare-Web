import { EMAIL, USER_ID } from '../constants/token'
import { userMetaRepository } from '../repositories/userMetaRepository'
import { UserMetaReq } from '../types/api/req/UserMetaReq'
import { UserReq } from '../types/api/req/userReq'

import { UserMeta } from '../types/domain/user'

export const userMetaService = {
    async findOne(uid: string): Promise<UserMeta> {
        return userMetaRepository.findOne(uid)
    },
    async save(userReq: UserReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        const user: UserMeta = {
            department: userReq.department,
            subject: userReq.subject,
            grade: userReq.grade,
            name: userReq.name,
            email: sessionStorage.getItem(EMAIL)!,
        }
        return userMetaRepository.save(user, userId!)
    },
}
