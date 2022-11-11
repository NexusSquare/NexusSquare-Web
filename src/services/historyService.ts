import { historyRepository } from '../repositories/historyRepository'
import { History } from '../types/domain/history'

export const historyService = {
    async find(userId: string): Promise<History[]> {
        return historyRepository.find(userId)
    },
} as const
