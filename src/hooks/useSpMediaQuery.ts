import { useMediaQuery } from '@chakra-ui/react'

export const useSpMediaQuery = () => {
    const [isSp] = useMediaQuery('(max-width: 768px)')
    return { isSp } as const
}
