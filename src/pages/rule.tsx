import { NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Layout'
import { RulePage } from '../components/pages/Rule/Page'

const Rule: NextPageWithLayout = () => <RulePage />

Rule.getLayout = (page) => <Layout pageName="利用規約">{page}</Layout>

export default Rule
