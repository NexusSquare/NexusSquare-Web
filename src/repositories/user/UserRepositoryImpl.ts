import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../plugins/firebase/client'
import { User } from '../../entities/user'
import { UserRepository } from './UserRepository'
import { userConverter } from './UserConverter'

class UserRepositoryImpl implements UserRepository {
    async findById(uid: string): Promise<User | undefined> {
        console.count('user fetch')
        const userRef = doc(db, `users/${uid}`).withConverter(userConverter)
        const res = await getDoc(userRef)
        return res.data()
    }
    async save(user: User): Promise<void> {
        const userRef = doc(db, 'users', user.userId).withConverter(userConverter)
        return await setDoc(userRef, user)
    }

    async update(user: Partial<User>, uid: string): Promise<void> {
        const userRef = doc(db, 'users', uid)
        return await updateDoc(userRef, user)
    }
}

export const userRepository = new UserRepositoryImpl()
