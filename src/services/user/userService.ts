import { UserReq } from '../../api/req'
import { UserParams } from '../../entities/factories/userFactory'
import { UserMeta } from '../../entities/user'
import { User } from '../../entities/user/User'

export interface UserService {
    findMyself(): Promise<User>
    findById(uid: string): Promise<User>
    save(params: UserParams): Promise<{ user: User; userMeta: UserMeta }>
    update(userReq: Partial<UserReq>): Promise<void>
}
