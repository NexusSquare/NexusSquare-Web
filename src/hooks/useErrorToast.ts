import { useToast } from '@chakra-ui/react'
import React from 'react'

export const useErrorToast = () => {
    const toast = useToast()
    const errorToast = (message: string) => {
        toast({
            title: message,
            status: 'error',
            isClosable: true,
        })
    }
    return errorToast
}
