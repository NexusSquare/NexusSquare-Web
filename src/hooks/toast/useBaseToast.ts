import { useToast } from '@chakra-ui/react'

type ToastStatus = 'error' | 'info' | 'warning' | 'success' | undefined

export const useBaseToast = (status: ToastStatus, id: string) => {
    const baseToast = useToast()

    const toast = (message: string) => {
        if (baseToast.isActive(id)) return
        baseToast({
            title: message,
            status: status,
            isClosable: true,
            id: status,
        })
    }
    return toast
}
