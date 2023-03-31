import { User } from '../../entities/user'

export interface UserRepository {
    findById(userId: string): Promise<User | undefined>
    save(user: User): Promise<void>
    update(user: Partial<User>, userId: string): Promise<void>
}
