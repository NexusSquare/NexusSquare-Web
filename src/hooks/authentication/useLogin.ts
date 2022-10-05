import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from '@react-query-firebase/auth'
import { auth } from '../../plugins/firebase'

export const useLogin = () => {
    return useAuthSignInWithEmailAndPassword(auth)
}

export const useLogOut = () => {
    return useAuthSignOut(auth)
}