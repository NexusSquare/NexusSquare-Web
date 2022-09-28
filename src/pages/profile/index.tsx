import { NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/Form/Layout'
import { Page } from '../../components/pages/Profile/Page'

const Profile: NextPageWithLayout = () => <Page />

Profile.getLayout = (page) => <Layout pageName="プロフィール">{page}</Layout>

export default Profile
