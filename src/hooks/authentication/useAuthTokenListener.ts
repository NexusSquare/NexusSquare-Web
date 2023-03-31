import { useEffect } from 'react'
import { auth } from '../../plugins/firebase/client'
import nookies from 'nookies'
import { cookieKey } from '../../constants/cookies'

const FIREBASE_ID_TOKEN_INTERVAL = 10 * 60 * 1000
export const useAuthTokenListener = () => {
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                nookies.destroy(null, cookieKey)
                return
            }
            const token = await user.getIdToken()
            console.log(token, 'token')
            nookies.set(undefined, cookieKey, token, {})
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
}
