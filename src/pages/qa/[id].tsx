import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, GetStaticProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Detail/Page'
import queryOptions from '../../constants/qa/queryOptions'
import { UserGuards } from '../../guards/UserGuards'
import QAResponse from '../../types/api/res/qa/qaResponse'
import PerfectQuestion from '../../types/domain/qa/PerfectQuestion'
import Question from '../../types/domain/qa/Question'

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
