import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PAGE_LINKS } from '../constants/pageLinks'
import { EMAIL, USER_ID } from '../constants/token'
import { useAuth } from '../hooks/authentication'
import { useFetchMyUser, useFetchMyUserMeta, useFetchUser, useFetchUserMeta } from '../hooks/user/useFetchUser'
import { useSessionToken } from '../hooks/useSessionToken'
import { useUser, useUserMeta } from '../store/atom'
import { User, UserMeta } from '../entities/user'
import { authRepository } from '../repositories/auth/AuthRepositoryImpl'
import { userRepository } from '../repositories/user/UserRepositoryImpl'
import { useAuthTokenListener } from '../hooks/authentication/useAuthListener'
import { pagesPath } from '../lib/$path'
import { userMetaRepository } from '../repositories/user/meta/UserMetaRepositoryImpl'
import { auth } from '../plugins/firebase/client'

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const { data: currentUser } = useAuth()
    const { setUser } = useUser()
    const { setUserMeta } = useUserMeta()
    const { setToken, deleteToken } = useSessionToken()

    // NOTE ログインするとcookieにtokenが保存される。
    useAuthTokenListener()

    // NOTE idが存在するときのみfetchされる
    // NOTE メール認証がされている場合、アカウント登録されている確認
    // NOTE プロフィールを編集するとキャッシュクリアされ、グローバルstateも更新される。
    const { data: user, isError: isUserError } = useFetchUser(currentUser?.uid)
    const { data: userMeta, isError: isUserMetaError } = useFetchUserMeta(currentUser?.uid)

    const isExistUser = !isUserError && !isUserMetaError

    const clearUser = () => {
        setUser(undefined)
        setUserMeta(undefined)
        deleteToken()
        return
    }

    const initUser = (user: User, userMeta: UserMeta) => {
        setUser(user)
        setUserMeta(userMeta)
        setToken(user.userId, userMeta.email)
    }

    useEffect(() => {
        // NOTE userが存在しない場合、ログインしていないとみなす。
        if (currentUser === undefined) return
        if (currentUser === null) return clearUser()

        // NOTE メール認証・ユーザー登録を確認
        if (!currentUser?.emailVerified) {
            router.push(pagesPath.register.step2.$url())
            return
        }

        // NOTE ユーザー登録がされていない場合、登録画面へ遷移
        if (!isExistUser) {
            router.push(pagesPath.register.step3.$url())
            return
        }

        if (user && userMeta) {
            initUser(user, userMeta)
        }
    }, [currentUser, user, userMeta, isExistUser])

    return <>{children}</>
}
