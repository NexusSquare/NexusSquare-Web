import { useToast } from '@chakra-ui/react'
import toast from 'react-hot-toast'

export const useErrorToast = () => {
    const errorToast = (message: string) => {
        toast.error(message, {
            position: 'bottom-center',
        })
    }
    return errorToast
}
