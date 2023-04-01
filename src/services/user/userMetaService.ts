import { ERROR } from '../../constants/errors'
import { EMAIL, USER_ID } from '../../constants/token'
import { userMetaRepository } from '../../repositories/user/meta/UserMetaRepositoryImpl'
import { UserReq } from '../../api/req/UserReq'
import { UserMeta } from '../../entities/user'
import { authRepository } from '../../repositories/auth/AuthRepositoryImpl'

class UserMetaService {
    public findMyself = async (): Promise<UserMeta> => {
        const userId = authRepository.getMyId()
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const userMeta = await userMetaRepository.findById(userId)
        if (!userMeta) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return userMeta
    }
    async findOne(uid: string): Promise<UserMeta | undefined> {
        const userMeta = userMetaRepository.findById(uid)
        if (!userMeta) throw new Error(ERROR.NO_SUCH_DOCUMENT)
        return userMeta
    }
}

export const userMetaService = new UserMetaService()
