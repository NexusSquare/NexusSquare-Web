import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../plugins/firebase/client'
import { Notification } from '../entities/notification/Notification'

export const notificationRepository = {
    async find(userId: string): Promise<Notification[]> {
        console.log('notification fetch')
        const notificationCol = collection(db, `users/${userId}/notifications`)
        const notificationQuery = query(notificationCol, where('isRead', '==', false), orderBy('createAt', 'desc'))
        const snapShot = await getDocs(notificationQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), notificationId: doc.id } as Notification
        })
    },
    // NOTE 既読に更新
    async update(userId: string, notificationId: string): Promise<void> {
        const notificationDoc = doc(db, `users/${userId}/notifications`, notificationId)
        updateDoc(notificationDoc, { isRead: true })
    },
} as const
