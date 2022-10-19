import { addDoc, collection } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { Report } from '../types/domain/report'

export const reportRepository = {
    async save(report: Report): Promise<void> {
        const reportCol = collection(db, 'reports')
        addDoc(reportCol, report)
    },
} as const
