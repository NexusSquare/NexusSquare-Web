import { updateProfile, User } from 'firebase/auth'
import { auth } from '../../plugins/firebase/client'
import { AuthRepository } from './AuthRepository'

class AuthRepositoryImpl implements AuthRepository {
    public getIdToken = async (): Promise<string | undefined> => {
        const idToken = await auth.currentUser?.getIdToken()
        return idToken
    }
    public getUser = (): User | undefined => {
        const user = auth.currentUser
        return user ?? undefined
    }
    public getMyId = (): string | undefined => {
        const uid = auth.currentUser?.uid
        return uid
    }
    public getMyEmail = (): string | undefined | null => {
        const email = auth.currentUser?.email
        return email
    }
}

export const authRepository = new AuthRepositoryImpl()
