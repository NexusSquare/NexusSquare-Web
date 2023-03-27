import { sendPasswordResetEmail } from '@firebase/auth'
import { async } from '@firebase/util'
import { updatePassword } from 'firebase/auth'
import { ERROR } from '../../../constants/errors'
import { auth } from '../../../plugins/firebase/client'
import { PasswordRepository } from './PasswordRepository'

class PasswordRepositoryImpl implements PasswordRepository {
    public sendResetEmail = async (email: string): Promise<void> => {
        sendPasswordResetEmail(auth, email)
    }

    public update = (password: string) => {
        const user = auth.currentUser
        if (!user) throw new Error(ERROR.LOGIN_REQUIRED)
        updatePassword(user, password)
    }
}

export const passwordRepository = new PasswordRepositoryImpl()
