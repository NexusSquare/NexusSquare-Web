import { NextPageWithLayout } from 'next'
import { FormLayout } from '../../components/layouts/Form/Layout'
import { PasswordForgotPage } from '../../components/pages/Password/Forgot/Page'

const PasswordForgot: NextPageWithLayout = () => <PasswordForgotPage />

PasswordForgot.getLayout = (page) => <FormLayout pageName="パスワードの再設定">{page}</FormLayout>

export default PasswordForgot
