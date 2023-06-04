import { useAuthSendEmailVerification } from '@react-query-firebase/auth'
import { useMutation } from 'react-query'
import { actionCodeSettings, auth } from '../../plugins/firebase/client'
import { authRepository } from '../../repositories/auth/AuthRepositoryImpl'

interface AfterFunction {
    onSuccess?: Function
    onSettled?: Function
    onError?: Function
}

export const useSendEmail = () => {
    return useMutation(() => authRepository.sendEmailVerification())
}
