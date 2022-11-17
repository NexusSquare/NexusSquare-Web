import { Timestamp } from "firebase/firestore"

export type NotificationRes = {
    documentId: string
    document: {
        notificationId: string
        questionId: string
        questionTitle: string
        isRead: boolean
        createAt: Timestamp
        postUserId: string
        nickname: string
        imageUrl: string
        type: string
    }
}