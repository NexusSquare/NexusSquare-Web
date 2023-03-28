/* eslint-disable react/display-name */
import { HStack, VStack, Text, Box, Avatar, WrapItem } from '@chakra-ui/react'
import React, { memo } from 'react'
import { FaCoins } from 'react-icons/fa'
import { User, UserMeta } from '../../../../entities/user'
import { ProfileItem } from './_ProfileItem'

interface Props {
    user: User
}

export const OthersInfo = memo(({ user }: Props) => {
    return (
        <>
            <VStack
                w="full"
                border="1px"
                borderColor="gray.300"
                borderRadius="sm"
                justifyContent="space-evenly"
                pb="2"
                position="relative"
                mx="4"
            >
                <Box
                    position="relative"
                    w={{ base: '80px', md: '100px' }}
                    h={{ base: '80px', md: '100px' }}
                    top={-10}
                    mb={-10}
                >
                    <Avatar
                        width="full"
                        height="full"
                        src={user.imageUrl}
                        bg="white"
                        borderColor={'gray.200'}
                        borderWidth="1px"
                    />
                </Box>
                <VStack w="full">
                    <Text fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }}>
                        {user.nickname}
                    </Text>
                    <ProfileItem label={'学部'} value={user.department} isAnonymous={user.isDepartmentAnonymous} />
                    <ProfileItem label={'学科'} value={user.subject} isAnonymous={user.isDepartmentAnonymous} />
                    <ProfileItem label={'学年'} value={user.grade} />
                    <Text fontSize={{ base: 'md', md: 'xl' }}>
                        現在のポイント：
                        <Box color="red.400" fontWeight={'bold'} as="span">
                            {user.point}pt
                        </Box>
                    </Text>
                </VStack>
            </VStack>
        </>
    )
})
