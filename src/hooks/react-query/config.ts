export const DEFAULT_QUERY_OPTIONS = {
    staleTime: Infinity,
} as const

// NOTE: キャッシュは常に新鮮なものとみなされるのでバックグラウンドでのフェッチは自動的には行われない。
