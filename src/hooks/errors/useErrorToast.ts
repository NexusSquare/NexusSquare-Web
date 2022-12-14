import { useToast } from '@chakra-ui/react'

export const useErrorToast = () => {
    const toast = useToast()
    const toastId = 'error'

    const errorToast = (message: string) => {
        if (toast.isActive(toastId)) return
        toast({
            title: message,
            status: 'error',
            isClosable: true,
            id: toastId,
        })
    }
    return errorToast
}
