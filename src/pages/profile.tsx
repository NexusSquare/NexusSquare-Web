import { Box, Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '../components/common/Footer'
import Layout from '../components/common/Layout'
import LeftBar from '../components/common/LeftBar'
import RightBar from '../components/common/RigthBar'
import { ProfileContent } from '../components/profile/ProfileContent'
import History from '../types/domain/account/History'
import User from '../types/domain/account/User'

interface Props {
    user: User
}

const Profile = ({ user }: Props) => {
    const [histories, setHistories] = useState<History[]>([])
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
                    <ProfileContent user={user} />
                    <Footer />
                </VStack>

                <RightBar />
            </HStack>
        </Layout>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const defaultUrl: string = process.env.GET_USER_URL
            ? process.env.GET_USER_URL
            : 'http://localhost:4000/dev/user/'
        const url = defaultUrl + ``
        const response: AxiosResponse<User> = await axios.get(url)
        const { data: user, status } = response
        const props: Props = {
            user: user,
        }
        console.log(user)
        return { props }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return { notFound: true }
        }
    }
    return { notFound: true }
}
export default Profile
