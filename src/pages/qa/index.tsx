import { NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Page'

const QAHome: NextPageWithLayout = () => <Page />

QAHome.getLayout = (page) => <Layout pageName="Q&Aトップ">{page}</Layout>

export default QAHome
