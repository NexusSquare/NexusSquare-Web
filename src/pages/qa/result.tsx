import { NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { DefaultLayout } from '../../components/layouts/DefaultLayout'
import { QAResultPage } from '../../components/pages/QA/Result/Page'

const QAResult: NextPageWithLayout = () => {
    const router = useRouter()
    // const isReady = router.isReady
    const title = router.query.title ? String(router.query.title) : undefined

    return <QAResultPage title={title} />
}

QAResult.getLayout = (page) => <DefaultLayout pageName="Q&A検索結果">{page}</DefaultLayout>

export default QAResult
