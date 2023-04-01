import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../plugins/firebase/client'
import { Notification } from '../../entities/notification/Notification'
import { NotificationRepository } from './NotificationRepository'
import { notificationCOnverter } from './NotificationConverter'

class NotificationRepositoryImpl implements NotificationRepository {
    public find = async (userId: string): Promise<Notification[]> => {
        const notificationCol = collection(db, `users/${userId}/notifications`).withConverter(notificationCOnverter)
        const notificationQuery = query(notificationCol, where('isRead', '==', false), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(notificationQuery)

        return snapShot.docs.map((doc) => doc.data())
    }
    // NOTE 既読に更新
    async update(userId: string, notificationId: string): Promise<void> {
        const notificationDoc = doc(db, `users/${userId}/notifications`, notificationId)
        updateDoc(notificationDoc, { isRead: true })
    }
}

export const notificationRepository = new NotificationRepositoryImpl()
