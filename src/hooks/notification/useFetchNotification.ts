import { UseQueryOptions, useQuery } from 'react-query'
import { QUERY_KEYS } from '../../constants/query'
import { notificationService } from '../../services/notificationService'
import { Notification } from '../../types/domain/notification/Notification'
import { DEFAULT_QUERY_OPTIONS } from '../react-query-config/config'

// NOTE sessionストレージがnullを撮るため、nullを許す
// uidが存在するときのみfetchされる
export const useFetchNotifications = (uid?: string | null, queryOptions?: UseQueryOptions<Notification[]>) => {
    return useQuery<Notification[]>(
        [QUERY_KEYS.NOTIFICATIONS, { enabled: Boolean(uid) }],
        () => notificationService.find(uid!),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}
