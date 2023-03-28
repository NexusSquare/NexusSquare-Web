import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

export const QASkeleton = () => {
    return (
        <Box padding="10px 20px" border="1px" borderColor="gray.300" bg="white" w="full">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </Box>
    )
}
