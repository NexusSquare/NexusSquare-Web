import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/Profile/Layout'
import { Page } from '../../components/pages/Profile/Page'
import { UserGuards } from '../../guards/UserGuards'

const Profile: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <UserGuards>
            <Page userId={String(id)} />
        </UserGuards>
    )
}

Profile.getLayout = (page) => <Layout pageName="ユーザー登録">{page}</Layout>

export default Profile
