import { Timestamp } from 'firebase/firestore'
import { USER_ID } from '../constants/token'
import { reportRepository } from '../repositories/reportRepository'
import { ReportReq } from '../types/api/req/ReportReq'
import { Report } from '../types/domain/report'

export const reportService = {
    async save(reportReq: ReportReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        const report: Report = {
            postId: reportReq.postId,
            userId: userId!,
            type: reportReq.type,
            reason: reportReq.reason,
            createAt: Timestamp.now(),
        }
        return reportRepository.save(report)
    },
}
