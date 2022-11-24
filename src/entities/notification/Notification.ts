import { Timestamp } from 'firebase/firestore'

export type Notification = {
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
