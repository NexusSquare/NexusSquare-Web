import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/common/Layout'
import DefaultLayout from '../components/common/DefaultLayout'
import { TopInfo } from '../components/top/TopInfo'
import { TopAbout } from '../components/top/TopAbout'
import { TopFeature } from '../components/top/TopFeature'
import { TopButtonArea } from '../components/top/TopButtonArea'
import { TopSupporters } from '../components/top/TopSupporters '

const Home: NextPage = () => {
    return (
        <DefaultLayout pageName="トップ">
            <Box w="full">
                <TopInfo />
                <TopAbout />
                <TopFeature />
                <TopButtonArea />
                <TopSupporters />
            </Box>
        </DefaultLayout>
    )
}

export default Home
