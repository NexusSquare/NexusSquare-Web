import { HStack, VStack, Text, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { UserInfo } from './UserInfo'
import { History } from './History'
import { AiOutlineGift } from 'react-icons/ai'

export const ProfileContent = () => {
    const TARGET_IMAGE_PATH: string = '/images/target.png'
    return (
        <VStack w={'full'} spacing={10}>
            <HStack w={'full'} p="4" mb="8">
                <Link href="/qa" passHref>
                    <Text fontSize="lg" fontWeight="bold" cursor="pointer">
                        <Box as="span" color="mainColor">
                            ◀︎
                        </Box>
                        ホーム
                    </Text>
                </Link>
            </HStack>

            <UserInfo />
            <Link href="/gift" passHref>
                <Button
                    leftIcon={<AiOutlineGift />}
                    as="a"
                    color="white"
                    bgColor="red.400"
                    _hover={{ bgColor: 'red.200' }}
                    size="lg"
                    fontSize={{ base: 'lg', md: '2xl' }}
                    boxShadow="md"
                >
                    応募する
                </Button>
            </Link>
            <History />
        </VStack>
    )
}
