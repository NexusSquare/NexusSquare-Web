import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth'
import { auth } from '../../plugins/firebase/client'

export const useCreateAccount = () => {
    return useAuthCreateUserWithEmailAndPassword(auth)
}
