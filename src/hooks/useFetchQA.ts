import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { qaApi } from '../lib/axios'

interface Params {
    [key: string]: any
}

interface FetchRequest {
    url: string
    params?: Params
    skip?: boolean
}

interface FetchResponse<T> {
    data?: T | null
    refetch: (value?: Params) => Promise<void>
    error: any
    hasError: boolean
    isLoading: boolean
}
export function useFetchQA<T>({ url, params, skip }: FetchRequest): FetchResponse<T> {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<AxiosError | null>(null)
    const [hasError, setHasError] = useState(false)
    const abortController = new AbortController()
    const fetch = async (query?: Params) => {
        setLoading(true)
        await qaApi(url, { params: query, method: 'GET' })
            .then((res) => {
                setData(res.data)
            })
            .catch((err: AxiosError) => {
                setError(err)
                setHasError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (skip) return
        fetch(params)
        return () => {
            setData(null)
            setLoading(false)
            setHasError(false)
            setError(null)
            abortController.abort()
        }
    }, [])

    return {
        data,
        refetch: fetch,
        error,
        hasError,
        isLoading,
    }
}
