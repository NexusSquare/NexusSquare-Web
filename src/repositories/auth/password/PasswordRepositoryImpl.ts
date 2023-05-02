import { sendPasswordResetEmail } from '@firebase/auth'
import { async } from '@firebase/util'
import { updatePassword } from 'firebase/auth'
import { ERROR } from '../../../constants/errors'
import { auth, functions } from '../../../plugins/firebase/client'
import { PasswordRepository } from './PasswordRepository'
import { httpsCallable } from 'firebase/functions'

class PasswordRepositoryImpl implements PasswordRepository {
    public sendResetEmail = async (email: string): Promise<void> => {
        console.log(email)
        await httpsCallable(functions, 'sendPasswordRest')({ email })
    }

    public update = (password: string) => {
        const user = auth.currentUser
        if (!user) throw new Error(ERROR.LOGIN_REQUIRED)
        updatePassword(user, password)
    }
}

export const passwordRepository = new PasswordRepositoryImpl()
