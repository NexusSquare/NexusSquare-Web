import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/Profile/Layout'
import { Page } from '../../components/pages/Profile/Page'
import { UserGuards } from '../../guards/UserGuards'
import History from '../../types/domain/account/History'

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

const Profile: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <UserGuards>
            <Page histories={dummyHistories} userId={String(id)} />
        </UserGuards>
    )
}

Profile.getLayout = (page) => <Layout pageName="ユーザー登録">{page}</Layout>

export default Profile
