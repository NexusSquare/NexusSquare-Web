import { collection, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../plugins/firebase/client'
import { History } from '../entities/history'

export const historyRepository = {
    async find(userId: string): Promise<History[]> {
        console.log('history fethc')
        const historyCol = collection(db, `users/${userId}/histories`)
        const historyQuery = query(historyCol, orderBy('createdAt', 'desc'), limit(5))
        const snapShot = await getDocs(historyQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), historyId: doc.id } as History
        })
    },
} as const