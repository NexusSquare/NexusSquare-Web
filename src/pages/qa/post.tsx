import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Post/Page'
import { UserGuards } from '../../guards/UserGuards'

const Post: NextPageWithLayout = () => (
    <UserGuards>
        <Page />
    </UserGuards>
)

Post.getLayout = (page) => <Layout pageName="質問の投稿">{page}</Layout>

export default Post
