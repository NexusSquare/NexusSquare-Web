import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { auth } from '../../../plugins/firebase'

export const useCreateUser = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
    return {
        createUser: createUserWithEmailAndPassword,
        user: user,
        loading: loading,
        error: error,
    }
}

export const useLogin = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
    return {
        login: signInWithEmailAndPassword,
        user: user,
        loading: loading,
        error: error,
    }
}

export const useSendEmail = () => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)
    return {
        sendEmail: sendEmailVerification,
        sending: sending,
        error: error,
    }
}
