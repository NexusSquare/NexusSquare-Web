import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'

export const TopSupporters = () => {
    return (
        <VStack paddingY={'5%'} paddingX={{ base: '5%', md: '10%' }} spacing="30px">
            <Heading fontSize={'2xl'}>スポンサー企業様</Heading>
            <Stack direction={{ base: 'column', md: 'row' }}>
                <Box w="200px" h="100px" bgColor="gray.200">
                    企業様のロゴ？
                </Box>
                <Box w="200px" h="100px" bgColor="gray.200">
                    企業様のロゴ？
                </Box>
                <Box w="200px" h="100px" bgColor="gray.200">
                    企業様のロゴ？
                </Box>
                <Box w="200px" h="100px" bgColor="gray.200">
                    企業様のロゴ？
                </Box>
                <Box w="200px" h="100px" bgColor="gray.200">
                    企業様のロゴ？
                </Box>
            </Stack>
        </VStack>
    )
}
