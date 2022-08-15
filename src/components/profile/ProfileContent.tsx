import { HStack, VStack, Text, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { UserInfo } from './UserInfo'
import { AiOutlineGift } from 'react-icons/ai'
import User from '../../types/domain/account/User'
import History from '../../types/domain/account/History'
import { UserHistory } from './UserHistory'

const dummyUser: User = {
    id: 'hoge@example.com',
    department: '外国語学部',
    subject: '英米学科',
    grade: 1,
    firstname: '苗字',
    lastname: '太郎',
    firstnameFurigana: 'みょうじ',
    lastnameFurigana: 'たろう',
    point: 1500,
    updateAt: '2020.03.09',
    imageUrl: undefined,
    isNameAnonymous: false,
    isDepartmentAnonymous: false,
}

const dummyHistory: History = {
    id: 'hoge@example.com',
    point: 20,
    createAt: '2020.03.09',
    category: 'answer',
}

interface Props {
    user: User
}
export const ProfileContent = ({ user }: Props) => {
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

            <UserInfo user={user} />
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
            <UserHistory history={dummyHistory} />
        </VStack>
    )
}
