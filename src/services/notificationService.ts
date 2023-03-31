import { ERROR } from '../constants/errors'
import { USER_ID } from '../constants/token'

import { Notification } from '../entities/notification/Notification'
import { authRepository } from '../repositories/auth/AuthRepositoryImpl'
import { notificationRepository } from '../repositories/notification/NotificationRepositoryImpl'

export const notificationService = {
    async find(userId: string): Promise<Notification[]> {
        return notificationRepository.find(userId)
    },
    async update(notificationId: string): Promise<void> {
        const userId = authRepository.getMyId()
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        return notificationRepository.update(userId, notificationId)
    },
}
