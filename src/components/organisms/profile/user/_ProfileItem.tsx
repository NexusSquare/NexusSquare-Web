import { Box, Text } from '@chakra-ui/react'

interface profileItemProps {
    label: string
    value: string | number
    isAnonymous?: boolean
}
export const ProfileItem = ({ label, value, isAnonymous = false }: profileItemProps) => {
    return (
        <Text fontSize={{ base: 'md', md: 'xl' }}>
            {label}：
            <Box fontWeight={'bold'} as="span">
                {isAnonymous ? '非表示' : value}
            </Box>
        </Text>
    )
}
