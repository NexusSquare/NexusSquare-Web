import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from '@react-query-firebase/auth'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { auth } from '../../plugins/firebase/client'

import { useUser, useUserMeta } from '../../store/atom'
import { User, UserAccount, UserMeta } from '../../entities/user'
import { useAlertLoginError } from '../errors/useAlertLoginError'
import { useSessionToken } from '../useSessionToken'

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
                onSuccess: () => router.back(),
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
