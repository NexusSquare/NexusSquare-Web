import { NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/Form/Layout'
import { Page } from '../../components/pages/Register/Step3/Page'

const Register: NextPageWithLayout = () => <Page />

Register.getLayout = (page) => <Layout pageName="新規登録">{page}</Layout>

export default Register
