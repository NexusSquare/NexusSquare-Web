import { Text } from '@chakra-ui/react'
import type { TextProps } from '@chakra-ui/react'

export const TextLink = ({ children, ...props }: TextProps) => {
    return (
        <Text {...props} fontWeight={'bold'} fontSize={'sm'} as="button" _hover={{ textDecoration: 'underline' }}>
            {children}
        </Text>
    )
}
