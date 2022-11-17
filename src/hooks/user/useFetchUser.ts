import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_KEYS } from '../react-query/query'
import { userMetaService } from '../../services/userMetaService'
import { userService } from '../../services/userService'
import { User, UserMeta } from '../../../entities/user'
import { DEFAULT_QUERY_OPTIONS } from '../react-query/config'

// NOTE sessionストレージがnullを撮るため、nullを許す
// uidが存在するときのみfetchされる
export const useFetchUser = (uid?: string | null, queryOptions?: UseQueryOptions<User | undefined>) => {
    return useQuery<User | undefined>(
        [QUERY_KEYS.USER(uid), { enabled: Boolean(uid) }],
        () => userService.findOne(uid!),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}

export const useFetchUserMeta = (uid?: string | null, queryOptions?: UseQueryOptions<UserMeta | undefined>) => {
    return useQuery<UserMeta | undefined>(
        [QUERY_KEYS.USER_META, { enabled: Boolean(uid) }],
        () => userMetaService.findOne(uid!),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}
