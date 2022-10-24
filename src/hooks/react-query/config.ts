export const DEFAULT_QUERY_OPTIONS = {
    staleTime: 3600000,
    cacheTime: 3600000,
} as const

// NOTE: 1時間はキャッシュされたデータを返す。
