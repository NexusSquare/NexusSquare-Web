import type { NextPage, NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Layout'
import { HomePage } from '../components/pages/Page'

const Home: NextPageWithLayout = () => <HomePage />

Home.getLayout = (page) => <Layout pageName="トップページ">{page}</Layout>

export default Home
