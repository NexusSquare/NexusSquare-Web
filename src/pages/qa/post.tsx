import { NextPage, NextPageWithLayout } from 'next'
import { DefaultLayout } from '../../components/layouts/DefaultLayout'
import { PostPage } from '../../components/pages/QA/Post/Page'
import { UserGuards } from '../../guards/UserGuards'

const Post: NextPageWithLayout = () => <PostPage />

Post.getLayout = (page) => (
    <UserGuards>
        <DefaultLayout pageName="質問の投稿">{page}</DefaultLayout>{' '}
    </UserGuards>
)

export default Post
