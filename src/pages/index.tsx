import { Box } from '@chakra-ui/react'
import type { NextPage, NextPageWithLayout } from 'next'
import { Layout } from '../components/layouts/Layout'
import { Page } from '../components/pages/Page'

const Home: NextPageWithLayout = () => <Page />

Home.getLayout = (page) => <Layout pageName="トップページ">{page}</Layout>

export default Home
