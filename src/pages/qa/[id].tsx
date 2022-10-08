import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Detail/Page'
import { UserGuards } from '../../guards/UserGuards'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <UserGuards>
            <Page questionId={String(id)} />
        </UserGuards>
    )
}

Detail.getLayout = (page) => <Layout pageName="Q&A一覧">{page}</Layout>

export default Detail
