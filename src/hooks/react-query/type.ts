import { QueryObserverResult } from 'react-query'

export type Refetch<T> = () => Promise<QueryObserverResult<T, unknown>>
