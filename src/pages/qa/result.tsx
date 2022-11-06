import { NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Result/Page'

const QAResult: NextPageWithLayout = () => <Page />

QAResult.getLayout = (page) => <Layout pageName="Q&Aトップ">{page}</Layout>

export default QAResult
