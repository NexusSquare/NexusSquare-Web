import { NextPage, NextPageWithLayout } from 'next'
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
