import { User } from 'firebase/auth'

export interface AuthRepository {
    getIdToken(user: User): Promise<string | undefined>
    getMyId(): string | undefined
}
