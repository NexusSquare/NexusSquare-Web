import { signOut } from '@firebase/auth'
import {
    useAuthState,
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

export const useAuth = () => {
    const [user, loading, error] = useAuthState(auth)
    return {
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

export const logOut = () => {
    signOut(auth)
}

export const useSendEmail = () => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)
    return {
        sendEmail: sendEmailVerification,
        sending: sending,
        error: error,
    }
}
