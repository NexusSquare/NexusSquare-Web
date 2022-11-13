import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from '@react-query-firebase/auth'
import { UserCredential } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { MutateOptions } from 'react-query'
import { LINKS } from '../../constants/links'
import { EMAIL, USER_ID } from '../../constants/token'
import { auth } from '../../plugins/firebase/client'
import { userMetaService } from '../../services/userMetaService'
import { userService } from '../../services/userService'
import { useUser, useUserMeta } from '../../store/atom'
import { User, UserMeta } from '../../types/domain/user'
import { useAlertLoginError } from '../errors/useAlertLoginError'
import { useSessionToken } from '../useSessionToken'

interface AfterFunction {
    onSuccess?: Function
    onSettled?: Function
    onError?: Function
}

export const useLogin = () => {
    const { alertLoginError } = useAlertLoginError()
    const mutation = useAuthSignInWithEmailAndPassword(auth)
    const router = useRouter()
    const { setUser } = useUser()
    const { setUserMeta } = useUserMeta()
    const { mutate } = mutation
    const { setToken } = useSessionToken()

    const initUser = async (user: User, userMeta: UserMeta) => {
        setUser(user)
        setUserMeta(userMeta)
        setToken(user.userId, userMeta.email)
        console.log(user)
    }

    const onSuccessLogin = async (data: UserCredential) => {
        // NOTE メール認証がされている場合、アカウント登録されている確認
        const { emailVerified, uid } = data.user
        if (!emailVerified) {
            router.push(LINKS.REGISTER.STEP2)
            return
        }
        // NOTE idが存在するときのみfetchされる
        const user = await userService.findOne(uid)
        const userMeta = await userMetaService.findOne(uid)
        if (!user || !userMeta) {
            router.push(LINKS.REGISTER.STEP3)
            return
        }
        initUser(user, userMeta)
    }
    const login = useCallback(async ({ email, password }, args?: AfterFunction) => {
        mutate(
            {
                email,
                password,
            },
            {
                onSuccess: async (data) => {
                    await onSuccessLogin(data)
                    args?.onSuccess?.(data)
                },
                onError: async (error) => {
                    alertLoginError(error.code)
                    args?.onError?.(error)
                },
                onSettled: async (data) => args?.onSettled?.(data),
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

    const logOut = useCallback(() => {
        mutate()
        clearUser()
    }, [])

    return { ...mutation, mutate: logOut } as const
}
