import { useMutation } from 'react-query'
import { passwordService } from '../../services/auth/password/PasswordServiceImpl'

export const useSendPasswordResetEmail = () => {
    return useMutation((email: string) => passwordService.sendResetEmail(email))
}

export const useUpdatePassword = () => {
    return useMutation((password: string) => passwordService.update(password))
}
