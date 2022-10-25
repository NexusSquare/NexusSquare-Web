import { useQueryClient } from 'react-query'

export const useCacheClear = () => {
    const queryClient = useQueryClient()
    const cacheClear = (key: string) => {
        queryClient.invalidateQueries(key)
    }
    return { cacheClear }
}
