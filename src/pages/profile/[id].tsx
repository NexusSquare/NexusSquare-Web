import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../components/layouts//DefaultLayout'
import { ProfilePage } from '../../components/pages/Profile/Page'
import { UserGuards } from '../../guards/UserGuards'

export type Query = {
    tab?: string
}

const Profile: NextPageWithLayout = () => {
    const router = useRouter()
    const { id, tab } = router.query

    return (
        <UserGuards>
            <ProfilePage userId={String(id)} tab={String(tab)} />
        </UserGuards>
    )
}

Profile.getLayout = (page) => <DefaultLayout pageName="ユーザー登録">{page}</DefaultLayout>

export default Profile
