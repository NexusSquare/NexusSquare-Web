import { History } from '../../entities/history'
export interface HistoryRepository {
    findByUserId(userId: string): Promise<History[]>
}
