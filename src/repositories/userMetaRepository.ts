import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { UserMeta } from '../types/domain/user'

export const userMetaRepository = {
    async findOne(uid: string): Promise<UserMeta> {
        const userRef = doc(db, `user_meta/${uid}`)
        const res = await getDoc(userRef)
        const oneUser = res.data() as UserMeta
        return oneUser
    },
    async save(user: UserMeta, uid: string): Promise<void> {
        const userRef = doc(db, 'user_meta', uid)
        return await setDoc(userRef, user)
    },
}
