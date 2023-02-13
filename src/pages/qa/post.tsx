import { NextPage, NextPageWithLayout } from 'next'
import { DefaultLayout } from '../../components/layouts/DefaultLayout'
import { PostPage } from '../../components/pages/QA/Post/Page'
import { UserGuards } from '../../guards/UserGuards'

const Post: NextPageWithLayout = () => (
    <UserGuards>
        <PostPage />
    </UserGuards>
)

Post.getLayout = (page) => <DefaultLayout pageName="質問の投稿">{page}</DefaultLayout>

export default Post
