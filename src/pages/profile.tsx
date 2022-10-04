import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Profile/Layout'

import { Page } from '../components/pages/Profile/Page'
import { UserGuards } from '../guards/UserGuards'
import History from '../types/domain/account/History'

import User from '../types/domain/account/User'

interface Props {
    user: User
}

const dummyUser: User = {
    department: '外国語学部',
    subject: '英米学科',
    grade: 1,
    firstname: '苗字',
    lastname: '太郎',
    firstnameFurigana: 'みょうじ',
    lastnameFurigana: 'たろう',
    point: 1500,
    updateAt: '2020.03.09',
    imageUrl: '',
    isNameAnonymous: false,
    isDepartmentAnonymous: false,
    mailAddres: 'hoge@example.com',
}

const dummyHistories: History[] = [
    {
        id: 'hoge@example.com',
        point: 20,
        createAt: '2020.03.09',
        category: 'answer',
    },
    {
        id: 'hoge@example.com',
        point: 20,
        createAt: '2020.03.09',
        category: 'question',
    },
    {
        id: 'hoge@example.com',
        point: 20,
        createAt: '2020.03.09',
        category: 'answer',
    },
]
const Profile: NextPageWithLayout = () => (
    <UserGuards>
        <Page user={dummyUser} histories={dummyHistories} />
    </UserGuards>
)

Profile.getLayout = (page) => <Layout pageName="プライバシーポリシー">{page}</Layout>

export default Profile
