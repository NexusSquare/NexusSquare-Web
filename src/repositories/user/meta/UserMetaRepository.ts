import { UserMeta } from '../../../entities/user/UserMeta'

export interface UserMetaRepository {
    findById(userId: string): Promise<UserMeta | undefined>
    save(userMeta: UserMeta, userId: string): Promise<void>
    update(userMeta: Partial<UserMeta>, userId: string): Promise<void>
}
