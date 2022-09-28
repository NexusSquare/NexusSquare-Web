import {
    Box,
    Button,
    HStack,
    Spinner,
    VStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
} from '@chakra-ui/react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineGift } from 'react-icons/ai'

import { Loading } from '../../../components/common/Loading'

import { UserHistory } from '../../../components/profile/UserHistory'
import { UserInfo } from '../../../components/profile/UserInfo'
import { clientApi } from '../../../lib/axios'
import History from '../../../types/domain/account/History'
import PostUser from '../../../types/api/req/account/PostUser'
import User from '../../../types/domain/account/User'
import UpdateUser from '../../../types/api/req/account/UpdateUser'
import { useErrorToast } from '../../../hooks/useErrorToast'
import { RiContactsBookLine } from 'react-icons/ri'

interface Props {
    user: User
    histories: History[]
}
export const Page = ({ user, histories }: Props): JSX.Element => {
    const [profile, setProfile] = useState<User>()
    const [historyList, setHistoryList] = useState<History[]>(histories)
    const router = useRouter()
    const userId = 'session?.user?.email'
    const errorToast = useErrorToast()

    const fetchProfile = async () => {
        await clientApi
            .get(`/user/${userId}`, {})
            .then((res: AxiosResponse<User>) => {
                setProfile(res.data)
            })
            .catch((err: AxiosError) => {
                errorToast()
            })
    }
    const fetchHistory = async () => {
        await clientApi
            .get(`/user/${userId}/history`, {})
            .then((res: AxiosResponse<History[]>) => {
                setHistoryList(res.data)
            })
            .catch(() => {
                errorToast()
            })
    }
    const updateProfile = async (updateUser: UpdateUser) => {
        await clientApi
            .put(`/user/${userId}`, updateUser, {})
            .then(() => {
                fetchProfile()
            })
            .catch(() => {
                errorToast()
            })
    }

    const deleteProfile = async () => {
        await clientApi
            .delete(`/user/${userId}`, {})
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch(() => {
                errorToast()
            })
    }

    return (
        <VStack w="full" spacing={12}>
            <HStack w={'full'} p="4" mb="8">
                <Link href="/qa" passHref>
                    <Text as="a" fontSize="lg" fontWeight="bold" cursor="pointer">
                        <Box as="span" color="mainColor">
                            ◀︎
                        </Box>
                        ホーム
                    </Text>
                </Link>
            </HStack>
            <UserInfo user={user!} updateProfile={updateProfile} />
            {/* <Link href="/gift" passHref>
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
            </Link> */}
            <UserHistory historyList={histories} />
        </VStack>
    )
}
