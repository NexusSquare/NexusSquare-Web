import { USER_ID } from '../constants/token'
import { notificationRepository } from '../repositories/notificationRepository'
import { Notification } from '../types/domain/notification/Notification'

export const notificationService = {
    async find(userId: string): Promise<Notification[]> {
        return notificationRepository.find(userId)
    },
    async update(notificationId: string): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        return notificationRepository.update(userId!, notificationId)
    },
}
