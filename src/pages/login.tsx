import { NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Form/Layout'
import { Page } from '../components/pages/Login/Page'

const Login: NextPageWithLayout = () => <Page />

Login.getLayout = (page) => <Layout pageName="ログイン">{page}</Layout>

export default Login
