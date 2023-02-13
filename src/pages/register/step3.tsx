import { NextPageWithLayout } from 'next'
import { FormLayout } from '../../components/layouts/Form/Layout'
import { Page } from '../../components/pages/Register/Step3/Page'

const Register: NextPageWithLayout = () => <Page />

Register.getLayout = (page) => <FormLayout pageName="新規登録">{page}</FormLayout>

export default Register
