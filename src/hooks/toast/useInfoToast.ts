import { useToast } from '@chakra-ui/react'
import { useBaseToast } from './useBaseToast'

export const useInfoToast = () => {
    const status = 'info'
    const toastId = 'info'
    const infoToast = useBaseToast(status, toastId)
    return infoToast
}
