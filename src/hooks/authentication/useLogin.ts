import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from '@react-query-firebase/auth'
import { UserCredential } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { MutateOptions } from 'react-query'
import { PAGE_LINKS } from '../../constants/pageLinks'
import { EMAIL, USER_ID } from '../../constants/token'
import { auth } from '../../plugins/firebase/client'
import { userMetaService } from '../../services/user/userMetaService'
import { userService } from '../../services/user/userService'
import { useUser, useUserMeta } from '../../store/atom'
import { User, UserAccount, UserMeta } from '../../entities/user'
import { useAlertLoginError } from '../errors/useAlertLoginError'
import { useSessionToken } from '../useSessionToken'
import { pagesPath } from '../../lib/$path'

export const useLogin = () => {
    const router = useRouter()
    const { alertLoginError } = useAlertLoginError()
    const mutation = useAuthSignInWithEmailAndPassword(auth)
    const { mutate } = mutation

    const login = useCallback(async ({ email, password }: UserAccount) => {
        mutate(
            {
                email,
                password,
            },
            {
                onSuccess: () => router.push(pagesPath.qa.$url()),
                onError: async (error) => {
                    alertLoginError(error.code)
                },
            }
        )
    }, [])
    return { ...mutation, mutate: login } as const
}

export const useLogOut = () => {
    const mutation = useAuthSignOut(auth)
    const { mutate } = mutation
    const { deleteToken } = useSessionToken()
    const { setUser } = useUser()
    const { setUserMeta } = useUserMeta()
    const clearUser = async () => {
        setUser(undefined)
        setUserMeta(undefined)
        deleteToken()
    }

    const logOut = useCallback(async () => {
        mutate()
        clearUser()
    }, [])

    return { ...mutation, mutate: logOut } as const
}
