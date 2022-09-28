import { NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/Form/Layout'
import { Page } from '../../components/pages/Profile/Register/Page'

const Register: NextPageWithLayout = () => <Page />

Register.getLayout = (page) => <Layout pageName="ユーザー登録">{page}</Layout>

export default Register
