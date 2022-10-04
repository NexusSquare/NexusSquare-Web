import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LINKS } from '../constants/links'
import { EMAIL, USER_ID } from '../constants/token'
import { useAuth } from '../hooks/authentication'
import { useFetchUser, useFetchUserMeta } from '../hooks/user/useFetchUser'
import { useUser, useUserMeta } from '../store/atom'
import { User, UserMeta } from '../types/domain/user'

export const AuthProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const { data: currentUser } = useAuth()
    const { setUser } = useUser()
    const { setUserMeta } = useUserMeta()

    // NOTE idが存在するときのみfetchされる
    // NOTE メール認証がされている場合、アカウント登録されている確認
    const { data: user } = useFetchUser(currentUser?.uid, {
        onSuccess: (data) => {
            if (!currentUser?.emailVerified) return
            if (!data) router.push(LINKS.REGISTER.STEP3)
            else setUser(data as User)
        },
    })
    const { data: userMeta } = useFetchUserMeta(currentUser?.uid, {
        onSuccess: (data) => {
            if (!currentUser?.emailVerified) return
            if (!data) router.push(LINKS.REGISTER.STEP3)
            else setUserMeta(data as UserMeta)
        },
    })

    const deleteSessionToken = () => {
        sessionStorage.removeItem(USER_ID)
        sessionStorage.removeItem(EMAIL)
    }

    const setSessionToken = (id: string, email: string) => {
        sessionStorage.setItem(USER_ID, id)
        sessionStorage.setItem(EMAIL, email)
    }

    useEffect(() => {
        // NOTE userが存在しない場合、ログインしていないとみなす。
        if (!currentUser) {
            setUser(undefined)
            setUserMeta(undefined)
            deleteSessionToken()
            return
        }
        console.log(currentUser)
        // setCurrentUser(user)

        setSessionToken(currentUser.uid, currentUser.email!)

        // NOTE メール認証・ユーザー登録を確認
        if (!currentUser?.emailVerified) {
            router.push(LINKS.REGISTER.STEP2)
        }
    }, [currentUser])

    return <>{children}</>
}
