import { AuthError } from '@firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../../plugins/firebase'
import User from '../../../types/domain/account/User'
import { UserInfoFormValue } from '../../../types/domain/form'
import { useAuth } from '../authentication'

export const usePostUser = () => {
    const [error, setError] = useState<unknown>()
    const [loading, setLoading] = useState<boolean>(false)
    const { user: currentUser } = useAuth()
    const postUser = async (user: UserInfoFormValue) => {
        setLoading(true)
        setError(undefined)
        try {
            if (currentUser) {
                const userRef = doc(db, 'user', currentUser?.uid)
                setDoc(userRef, user)
            } else {
                setError(new Error('No user is logged in') as AuthError)
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        postUser: postUser,
        error: error,
        loading: loading,
    }
}
