import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../components/layouts//DefaultLayout'
import { ProfilePage } from '../../components/pages/Profile/Page'

const Profile: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return <ProfilePage userId={String(id)} />
}

Profile.getLayout = (page) => <DefaultLayout pageName="ユーザー登録">{page}</DefaultLayout>

export default Profile
