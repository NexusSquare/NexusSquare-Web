import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase/client'
import { User } from '../../entities/user'

export const userRepository = {
    async findOne(uid: string): Promise<User | undefined> {
        console.log('user fetch')
        const userRef = doc(db, `users/${uid}`)
        const res = await getDoc(userRef)
        if (!res.exists()) return undefined
        const oneUser = { ...(res.data() as User), userId: res.id }
        return oneUser
    },
    async save(user: Omit<User, 'userId'>, uid: string): Promise<void> {
        const userRef = doc(db, 'users', uid)
        return await setDoc(userRef, user)
    },

    async update(user: Partial<User>, uid: string): Promise<void> {
        const userRef = doc(db, 'users', uid)
        return await updateDoc(userRef, user)
    },
} as const
