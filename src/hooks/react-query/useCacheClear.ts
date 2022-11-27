import { useQueryClient } from 'react-query'

export const useCacheClear = () => {
    const queryClient = useQueryClient()
    const cacheClearForKey = async (key: string) => {
        await queryClient.invalidateQueries(key)
    }
    return { cacheClearForKey }
}
