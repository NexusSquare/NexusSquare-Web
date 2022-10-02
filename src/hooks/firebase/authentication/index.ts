import { signOut } from '@firebase/auth'
import { AuthError, sendEmailVerification } from 'firebase/auth'
import { useState } from 'react'
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth'
import { actionCodeSettings, auth } from '../../../plugins/firebase'

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
    const [error, setError] = useState<AuthError>()
    const [sending, setSending] = useState<boolean>(false)

    const sendEmail = async () => {
        setSending(true)
        setError(undefined)
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser, actionCodeSettings)
            } else {
                setError(new Error('No user is logged in') as AuthError)
            }
        } catch (err) {
            setError(err as AuthError)
        } finally {
            setSending(false)
        }
    }
    return {
        sendEmail: sendEmail,
        sending: sending,
        error: error,
    }
}
