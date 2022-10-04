import { useQuery, UseQueryOptions } from 'react-query'
import { QUERY_KEYS } from '../../constants/query'
import { userMetaService } from '../../services/userMetaService'
import { userService } from '../../services/userService'

export const useFetchUser = (uid?: string, queryOptions?: UseQueryOptions) => {
    return useQuery([QUERY_KEYS.USER(uid), { enabled: uid !== undefined }], () => userService.findOne(uid!), {
        ...queryOptions,
    })
}

export const useFetchUserMeta = (uid?: string, queryOptions?: UseQueryOptions) => {
    return useQuery([QUERY_KEYS.USER_META, { enabled: uid !== undefined }], () => userMetaService.findOne(uid!), {
        ...queryOptions,
    })
}
