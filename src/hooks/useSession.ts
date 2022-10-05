import { useEffect, useState } from 'react'
import { useUser } from '../store/atom'

export const useSession = (key: string) => {
    const { user } = useUser()
    const [value, setValue] = useState<string | null>(null)
    useEffect(() => {
        if (!user) return
        setValue(sessionStorage.getItem(key))
    }, [user])
    return {
        value,
    }
}
