import { NextPageWithLayout } from 'next'
import { FormLayout } from '../components/layouts/Form/Layout'
import { Page } from '../components/pages/Login/Page'

const Login: NextPageWithLayout = () => <Page />

Login.getLayout = (page) => <FormLayout pageName="ログイン">{page}</FormLayout>

export default Login
