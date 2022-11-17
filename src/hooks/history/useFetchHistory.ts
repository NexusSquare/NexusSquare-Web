import { UseQueryOptions, useQuery } from 'react-query'
import { QUERY_KEYS } from '../react-query/query'
import { historyService } from '../../services/historyService'
import { History } from '../../../entities/history'
import { DEFAULT_QUERY_OPTIONS } from '../react-query/config'

// NOTE sessionストレージがnullを撮るため、nullを許す
// uidが存在するときのみfetchされる
export const useFetchHistories = (uid?: string | null, queryOptions?: UseQueryOptions<History[]>) => {
    return useQuery<History[]>(
        [QUERY_KEYS.HISTORIES(uid!), { enabled: Boolean(uid) }],
        () => historyService.find(uid!),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}
