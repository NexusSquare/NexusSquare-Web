import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../components/layouts/DefaultLayout'

import { DetailPage } from '../../components/pages/QA/Detail/Page'
import { UserGuards } from '../../guards/UserGuards'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <UserGuards>
            <DetailPage questionId={String(id)} />
        </UserGuards>
    )
}

Detail.getLayout = (page) => <DefaultLayout pageName="Q&A一覧">{page}</DefaultLayout>

export default Detail
