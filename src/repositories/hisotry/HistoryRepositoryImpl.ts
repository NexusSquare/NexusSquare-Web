import { collection, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../plugins/firebase/client'
import { History } from '../../entities/history'
import { HistoryRepository } from './HistoryRepository'
import { historyConverter } from './HistoryConverter'

class HistoryRepositoryImpl implements HistoryRepository {
    public findByUserId = async (userId: string): Promise<History[]> => {
        console.log('history fethc')
        const historyCol = collection(db, `users/${userId}/histories`).withConverter(historyConverter)
        const historyQuery = query(historyCol, orderBy('createdAt', 'desc'), limit(5))
        const snapShot = await getDocs(historyQuery)
        return snapShot.docs.map((doc) => doc.data())
    }
}

export const historyRepository = new HistoryRepositoryImpl()
