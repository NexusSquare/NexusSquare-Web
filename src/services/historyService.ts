import { historyRepository } from '../repositories/hisotry/HistoryRepositoryImpl'
import { History } from '../entities/history'

export const historyService = {
    async find(userId: string): Promise<History[]> {
        return historyRepository.findByUserId(userId)
    },
} as const
