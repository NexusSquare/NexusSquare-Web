import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { DEFAULT_QUERY_OPTIONS } from './react-query/config'

export const useFetch = <T>(key: QueryKey, queryFn: QueryFunction<T, QueryKey>, queryOptions?: UseQueryOptions<T>) => {
    return useQuery<T>(key, queryFn, {
        ...queryOptions,
        ...DEFAULT_QUERY_OPTIONS,
    })
}
