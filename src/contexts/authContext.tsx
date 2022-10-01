import { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'
import { LINKS } from '../constants/links'
import { useAuth } from '../hooks/firebase/authentication'

type AuthContextProps = {
    user: User | undefined | null
}

const AuthContext = createContext<AuthContextProps>({ user: undefined })

export const AuthProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const { user } = useAuth()

    //メール認証・ユーザー登録を確認
    useEffect(() => {
        if (!user) return
        console.log(user)
        if (!user?.emailVerified) {
            router.push(LINKS.REGISTER.STEP2)
        }
    }, [user])

    return <AuthContext.Provider value={{ user: user }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
