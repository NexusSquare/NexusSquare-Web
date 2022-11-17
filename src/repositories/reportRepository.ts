import { addDoc, collection } from 'firebase/firestore'
import { db } from '../plugins/firebase/client'
import { Report } from '../../entities/report'

export const reportRepository = {
    async save(report: Report): Promise<void> {
        const reportCol = collection(db, 'reports')
        addDoc(reportCol, report)
    },
} as const
