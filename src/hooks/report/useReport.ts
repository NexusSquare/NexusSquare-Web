import { useMutation, UseMutationOptions } from 'react-query'
import { reportService } from '../../services/reportService'
import { ReportReq } from '../../../api/req/ReportReq'

export const useReport = (queryOptions?: UseMutationOptions) => {
    return useMutation((reportReq: ReportReq) => reportService.save(reportReq))
}
