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
        ;(async () => {
            console.log('currentUser', currentUser)
            // NOTE userが存在しない場合、ログインしていないとみなす。
            if (currentUser === undefined) return

            if (currentUser === null) {
                clearUser()
                return
            }

            // NOTE メール認証・ユーザー登録を確認
            if (!currentUser.emailVerified) {
                router.push(pagesPath.register.step2.$url())
                return
            }

            const user = await userRepository.findById(currentUser.uid)
            const userMeta = await userMetaRepository.findById(currentUser.uid)

            // NOTE ユーザー登録がされていない場合、登録画面へ遷移
            if (user === undefined || userMeta === undefined) {
                router.push(pagesPath.register.step3.$url())
                return
            }

            initUser(user, userMeta)
        })()
    }, [currentUser])

    return <>{children}</>
}
