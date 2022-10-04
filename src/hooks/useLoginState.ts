import { useEffect, useState } from 'react'
import { useUser, useUserMeta } from '../store/atom'
import { useAuth } from './authentication'

export const useLoginState = () => {
    const { user } = useUser()
    const { userMeta } = useUserMeta()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])
    return isLoggedIn
}
