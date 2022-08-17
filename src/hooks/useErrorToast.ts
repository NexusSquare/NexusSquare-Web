import { useToast } from '@chakra-ui/react'
import React from 'react'

export const useErrorToast = () => {
    const toast = useToast()
    return () => {
        toast({
            title: `サーバーでエラーが発生しました。`,
            status: 'error',
            isClosable: true,
        })
    }
}
