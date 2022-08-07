import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/common/layout'

const Home: NextPage = () => {
    return (
        <Layout pageName="トップ">
            <Box paddingTop="60px">これはメインコンテンツです</Box>
        </Layout>
    )
}

export default Home
