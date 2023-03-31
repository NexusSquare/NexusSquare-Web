import { useQuery, UseQueryOptions } from 'react-query'
import { userMetaService } from '../../services/user/userMetaService'
import { userService } from '../../services/user/userService'
import { User, UserMeta } from '../../entities/user'
import { DEFAULT_QUERY_OPTIONS } from '../react-query/config'

const QUERY_KEYS = {
    USER_ONE: (id?: string | null) => `user-${id}`,
    USER_META: (id?: string | null) => `user-meta-${id}`,
    MY_USER: () => 'my-user',
    MY_USER_META: () => 'my-user-meta',
}

// NOTE sessionストレージがnullを撮るため、nullを許す
// uidが存在するときのみfetchされる
export const useFetchUser = (uid?: string | null, queryOptions?: UseQueryOptions<User>) => {
    return useQuery<User>([QUERY_KEYS.USER_ONE(uid), { enabled: Boolean(uid) }], () => userService.findOne(uid!), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchUserMeta = (uid?: string | null, queryOptions?: UseQueryOptions<UserMeta | undefined>) => {
    return useQuery<UserMeta | undefined>(
        [QUERY_KEYS.USER_META(uid), { enabled: Boolean(uid) }],
        () => userMetaService.findOne(uid!),
        {
            ...queryOptions,
            ...DEFAULT_QUERY_OPTIONS,
        }
    )
}

export const useFetchMyUser = (queryOptions?: UseQueryOptions<User>) => {
    return useQuery<User>(QUERY_KEYS.MY_USER(), () => userService.findMyself(), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}

export const useFetchMyUserMeta = (queryOptions?: UseQueryOptions<UserMeta>) => {
    return useQuery<UserMeta>(QUERY_KEYS.MY_USER_META(), () => userMetaService.findMyself(), {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}
