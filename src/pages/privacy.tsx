import { NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Layout'
import { Page } from '../components/pages/Privacy/Page'

const Privacy: NextPageWithLayout = () => <Page />

Privacy.getLayout = (page) => <Layout pageName="プライバシーポリシー">{page}</Layout>

export default Privacy
