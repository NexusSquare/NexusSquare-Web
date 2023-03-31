import { Notification } from '../../entities/notification/Notification'

export interface NotificationRepository {
    find(userId: string): Promise<Notification[]>
    update(userId: string, notificationId: string): Promise<void>
}
