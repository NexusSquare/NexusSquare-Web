import { useEffect } from 'react'
import { auth } from '../../plugins/firebase/client'
import nookies, { setCookie } from 'nookies'
import { cookieKey } from '../../constants/cookies'
import { useAuth } from './useAuth'
import { useRouter } from 'next/router'

const FIREBASE_ID_TOKEN_INTERVAL = 10 * 60 * 1000
export const useAuthTokenListener = () => {
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                removeIdToken()
                return
            }
            const token = await user.getIdToken()
            console.log('token', token)
            setIdToken(token)
        })
    }, [])

    //NOTE: FirebaseのIDトークンの有効期限は1時間なので、1時間ごとに更新する
    useEffect(() => {
        const handler = setInterval(async () => {
            const user = auth.currentUser
            if (user) {
                await user.getIdToken(true)
            }
        }, FIREBASE_ID_TOKEN_INTERVAL)
        return () => clearInterval(handler)
    }, [])

    const setIdToken = (token: string) => {
        setCookie(null, cookieKey, token)
    }

    const removeIdToken = () => {
        nookies.destroy(null, cookieKey)
    }
}
