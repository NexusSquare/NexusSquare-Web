import {
    Box,
    Button,
    HStack,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import Footer from '../components/common/Footer'
import Layout from '../components/common/Layout'
import LeftBar from '../components/common/LeftBar'
import { Loading } from '../components/common/Loading'
import RightBar from '../components/common/RigthBar'
import { UserHistory } from '../components/profile/UserHistory'
import { UserInfo } from '../components/profile/UserInfo'
import { clientApi } from '../lib/axios'
import History from '../types/domain/account/History'
import PostUser from '../types/api/req/account/PostUser'
import User from '../types/domain/account/User'
import UpdateUser from '../types/api/req/account/UpdateUser'
import { useErrorToast } from '../hooks/useErrorToast'

const Profile: NextPage = () => {
    const { data: session, status } = useSession()
    const [profile, setProfile] = useState<User>()
    const [historyList, setHistoryList] = useState<History[]>([])
    const userId = session?.user?.email
    const errorToast = useErrorToast()
    const fetchProfile = async () => {
        await clientApi
            .get(`/user/${userId}`, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then((res: AxiosResponse<User>) => {
                setProfile(res.data)
            })
            .catch((err: AxiosError) => {
                errorToast()
            })
    }
    const fetchHistory = async () => {
        await clientApi
            .get(`/user/${userId}/history`, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then((res: AxiosResponse<History[]>) => {
                setHistoryList(res.data)
            })
            .catch(() => {
                errorToast()
            })
    }
    const updateProfile = async (updateUser: UpdateUser) => {
        console.log(updateUser)
        await clientApi
            .put(`/user/${userId}`, updateUser, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then(() => {
                fetchProfile()
            })
            .catch(() => {
                errorToast()
            })
    }
    const deleteProfile = async () => {
        await clientApi
            .put(`/user/${userId}`, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch(() => {
                errorToast()
            })
    }

    useEffect(() => {
        if (!userId) return
        fetchProfile()
        fetchHistory()
    }, [userId])

    return (
        <Layout pageName={'プロフィール'}>
            <HStack spacing="0px">
                <LeftBar />
                <VStack
                    w={{
                        base: '100%',
                        sm: '100vw',
                        md: 'calc(100vw - 210px)',
                        lg: 'calc(100vw - 210px)',
                        xl: 'calc(400px + 50vw)',
                    }}
                    paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
                >
                    {profile ? (
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
                            <UserInfo user={profile} updateProfile={updateProfile} />
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
                            <UserHistory historyList={historyList} />
                        </VStack>
                    ) : (
                        <Loading />
                    )}
                    <Footer />
                </VStack>

                <RightBar />
            </HStack>
        </Layout>
    )
}

export default Profile
