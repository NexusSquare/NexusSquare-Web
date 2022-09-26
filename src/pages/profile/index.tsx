import { NextPageWithLayout } from 'next'
import Layout from '../../components/common/Layout'
import { Page } from '../../components/pages/Profile/Page'

const Register: NextPageWithLayout = () => <Page />

Register.getLayout = (page) => <Layout pageName="プロフィール">{page}</Layout>

export default Register
