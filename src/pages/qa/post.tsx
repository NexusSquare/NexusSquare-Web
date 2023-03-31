import { NextPage, NextPageWithLayout } from 'next'
import { DefaultLayout } from '../../components/layouts/DefaultLayout'
import { PostPage } from '../../components/pages/QA/Post/Page'

const Post: NextPageWithLayout = () => <PostPage />

Post.getLayout = (page) => <DefaultLayout pageName="質問の投稿">{page}</DefaultLayout>

export default Post
