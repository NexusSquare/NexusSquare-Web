import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../plugins/firebase/client'
import { UserMeta } from '../../../entities/user'
import { UserMetaRepository } from './UserMetaRepository'
import { userMetaConverter } from './UserMetaConverter'
import { convertUndefinedToNull } from '../../../lib/convert/convertUndefinedToNull'

class UserMetaRepositoryImpl implements UserMetaRepository {
    async findById(uid: string): Promise<UserMeta | undefined> {
        const userRef = doc(db, `user_meta/${uid}`).withConverter(userMetaConverter)
        const res = await getDoc(userRef)
        return res.data()
    }
    async save(user: UserMeta): Promise<void> {
        const userRef = doc(db, 'user_meta', user.userId).withConverter(userMetaConverter)
        return await setDoc(userRef, user)
    }
    public update(userMeta: Partial<UserMeta>, userId: string): Promise<void> {
        const userRef = doc(db, 'user_meta', userId)
        return updateDoc(userRef, convertUndefinedToNull(userMeta))
    }
}

export const userMetaRepository = new UserMetaRepositoryImpl()
