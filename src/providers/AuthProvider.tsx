import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PAGE_LINKS } from '../constants/pageLinks'
import { EMAIL, USER_ID } from '../constants/token'
import { useAuth } from '../hooks/authentication'
import { useFetchUser, useFetchUserMeta } from '../hooks/user/useFetchUser'
import { useSessionToken } from '../hooks/useSessionToken'
import { useUser, useUserMeta } from '../store/atom'
import { User, UserMeta } from '../entities/user'
import { authRepository } from '../repositories/auth/AuthRepositoryImpl'
import { userRepository } from '../repositories/user/UserRepositoryImpl'
import { useAuthTokenListener } from '../hooks/authentication/useAuthTokenListener'

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
    const { data: user } = useFetchUser(currentUser?.uid, {
        onSuccess: (data) => setUser(data),
    })
    const { data: userMeta } = useFetchUserMeta(currentUser?.uid, {
        onSuccess: (data) => setUserMeta(data),
    })

    const clearUser = () => {
        setUser(undefined)
        setUserMeta(undefined)
        deleteToken()
        return
    }

    useEffect(() => {
        // NOTE userが存在しない場合、ログインしていないとみなす。
        if (!currentUser) return clearUser()

        // setCurrentUser(user)
        const userId = currentUser.uid

        setToken(userId, currentUser.email!)

        // NOTE メール認証・ユーザー登録を確認
        if (!currentUser?.emailVerified) {
            router.push(PAGE_LINKS.REGISTER.STEP2.URL)
        }
    }, [currentUser])

    return <>{children}</>
}
