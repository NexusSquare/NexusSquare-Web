import { auth } from '../../plugins/firebase/client'
import { AuthRepository } from './AuthRepository'

class AuthRepositoryImpl implements AuthRepository {
    public getIdToken = async (): Promise<string | undefined> => {
        const idToken = await auth.currentUser?.getIdToken()
        return idToken
    }
    public getMyId = (): string | undefined => {
        const uid = auth.currentUser?.uid
        return uid
    }
}

export const authRepository = new AuthRepositoryImpl()
