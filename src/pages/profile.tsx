import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPageWithLayout } from 'next'
import { getSession } from 'next-auth/react'
import { Layout } from '../components/layouts/Layout'
import { Page } from '../components/pages/Profile/Page'
import { clientApi } from '../lib/axios'
import User from '../types/domain/account/User'

interface Props {
    user: User
}

const Profile: NextPageWithLayout = () => <Page />

Profile.getLayout = (page) => <Layout pageName="プライバシーポリシー">{page}</Layout>

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    try {
        const userId = session.user?.email
        const response: AxiosResponse<User> = await clientApi.get(`/user/${userId}`, {
            headers: {
                Authorization: `${session.idToken}`,
            },
        })
        const { data } = response
        const props: Props = {
            user: data,
        }
        return { props }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return {
                redirect: {
                    destination: 'profile/register',
                    permanent: false,
                },
            }
        }
    }
    return { notFound: true }
}

export default Profile
