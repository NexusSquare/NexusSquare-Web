import { Timestamp } from 'firebase/firestore'
import { ERROR } from '../constants/errors'
import { USER_ID } from '../constants/token'
import { reportRepository } from '../repositories/reportRepository'
import { ReportReq } from '../api/req/ReportReq'
import { Report } from '../entities/report'

export const reportService = {
    async save(reportReq: ReportReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        if (!userId) {
            throw new Error(ERROR.INVALID_USER_TOKEN)
        }
        const report: Report = {
            postId: reportReq.postId,
            userId: userId,
            type: reportReq.type,
            reason: reportReq.reason,
            createdAt: Timestamp.now(),
        }
        return reportRepository.save(report)
    },
}
