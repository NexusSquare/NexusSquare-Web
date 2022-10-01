import { useEffect, useState } from 'react'
import { useAuth } from './firebase/authentication'

export const useLoginState = () => {
    const { user, loading, error } = useAuth()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (error) console.log(error)
        if (loading) return
        if (user) {
            setIsLoggedIn(true)
        }
    }, [user])
    return isLoggedIn
}
