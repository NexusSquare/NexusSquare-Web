import { NextPageWithLayout } from 'next'
import { FormLayout } from '../../../components/layouts/Form/Layout'
import { AdminLoginPage } from '../../../components/pages/Admin/ Login/Page'

const AdminLogin: NextPageWithLayout = () => <AdminLoginPage />

AdminLogin.getLayout = (page) => <FormLayout pageName="管理者ログイン">{page}</FormLayout>

export default AdminLogin
