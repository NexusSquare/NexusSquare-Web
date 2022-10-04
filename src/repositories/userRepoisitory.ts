import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { User } from '../types/domain/user'

export const userRepository = {
    async findOne(uid: string): Promise<User> {
        const userRef = doc(db, `users/${uid}`)
        const res = await getDoc(userRef)
        const oneUser = res.data() as User
        return oneUser
    },
    async save(user: User, uid: string): Promise<void> {
        const userRef = doc(db, 'users', uid)
        return await setDoc(userRef, user)
    },

    async update(uid: string, user: User): Promise<void> {
        const userRef = doc(db, 'users', uid)
        return await updateDoc(userRef, user)
    },
}
