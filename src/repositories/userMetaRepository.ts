import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase/client'
import { UserMeta } from '../../entities/user'

export const userMetaRepository = {
    async findOne(uid: string): Promise<UserMeta | undefined> {
        console.log('userMeta fetch')
        const userRef = doc(db, `user_meta/${uid}`)
        const res = await getDoc(userRef)
        if (!res.exists()) return undefined
        const oneUser = res.data() as UserMeta
        return oneUser
    },
    async save(user: UserMeta, uid: string): Promise<void> {
        const userRef = doc(db, 'user_meta', uid)
        return await setDoc(userRef, user)
    },
} as const
