import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import { NotificationDocument } from '../documents/NotificationDocument'
import { Notification } from '../../entities/notification/Notification'

export const notificationCOnverter = {
    toFirestore: (notification: Notification): DocumentData => {
        const document: NotificationDocument = {
            createdAt: Timestamp.fromDate(notification.createdAt),
            isRead: notification.isRead,
            questionId: notification.questionId,
            questionTitle: notification.questionTitle,
            postUserId: notification.postUserId,
            nickname: notification.nickname,
            imageUrl: notification.imageUrl,
            type: notification.type,
        }
        return document
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Notification => {
        const data = snapshot.data(options) as NotificationDocument
        return {
            notificationId: snapshot.id,
            createdAt: data.createdAt.toDate(),
            isRead: data.isRead,
            questionId: data.questionId,
            questionTitle: data.questionTitle,
            postUserId: data.postUserId,
            nickname: data.nickname,
            imageUrl: data.imageUrl,
            type: data.type,
        }
    },
}
