import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { qaApi } from '../lib/axios'

interface Params {
    [key: string]: any
}

interface Body {
    [key: string]: any
}

interface FetchRequest<T> {
    url: string
    params?: Params
    skip?: boolean
    onSuccess?: () => void
    onError?: () => void
}

interface FetchResponse<T> {
    data?: T | null
    refetch: (value?: Params) => Promise<void>
    error: any
    hasError: boolean
    isLoading: boolean
}
interface CallbackRequest {
    method: 'POST' | 'PUT' | 'DELETE'
    url: string
    onSuccess?: () => void
    onError?: () => void
}

interface CallbackResponse {
    fetcher: (value?: Body) => Promise<void>
    error: AxiosError | null
    hasError: boolean
    isLoading: boolean
}

// レスポンスの値が必要なときに使用
export function useFetchQA<T>({ url, params, skip, onSuccess, onError }: FetchRequest<T>): FetchResponse<T> {
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
                onSuccess?.()
            })
            .catch((err: AxiosError) => {
                setError(err)
                setHasError(true)
                onError?.()
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
// レスポンスの値を必要としないときに使用
export function useFetchCallbackQA({ url, method, onSuccess, onError }: CallbackRequest): CallbackResponse {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<AxiosError | null>(null)
    const [hasError, setHasError] = useState(false)

    const fetch = async (body?: Body) => {
        setLoading(true)
        await qaApi(url, {
            data: body,
            method: method,
        })
            .then(() => {
                onSuccess?.()
            })
            .catch((err: AxiosError) => {
                setError(err)
                setHasError(true)
                onError?.()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return {
        fetcher: fetch,
        error,
        hasError,
        isLoading,
    }
}
