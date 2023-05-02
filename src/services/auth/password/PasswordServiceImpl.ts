import { passwordRepository } from '../../../repositories/auth/password/PasswordRepositoryImpl'
import { PasswordService } from './PasswordService'

class PasswordServiceImpl implements PasswordService {
    public sendResetEmail = async (email: string): Promise<void> => {
        await passwordRepository.sendResetEmail(email)
    }
    public update = async (password: string): Promise<void> => {
        passwordRepository.update(password)
    }
}

export const passwordService = new PasswordServiceImpl()
