import { NextPageWithLayout } from 'next'
import { QAPage } from '../../components/pages/QA/Page'

import { DefaultLayout } from '../../components/layouts/DefaultLayout'

const QAHome: NextPageWithLayout = () => {
    return <QAPage />
}

QAHome.getLayout = (page) => {
    return <DefaultLayout pageName="Q&Aトップ">{page}</DefaultLayout>
}

export default QAHome
