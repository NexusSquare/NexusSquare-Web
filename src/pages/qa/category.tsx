import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Category/Page'
import QAQueryProps from '../../constants/qa/queryGroup'
import queryOptions from '../../constants/qa/queryOptions'
import QAResponse from '../../types/api/res/qa/qaResponse'
import Question from '../../types/domain/qa/Question'

interface Props {
    questions: Question[]
    query: QAQueryProps
}

const CategorySelect: NextPageWithLayout<Props> = ({ questions, query }) => <Page questions={questions} query={query} />

CategorySelect.getLayout = (page) => <Layout pageName="カテゴリで絞り込む">{page}</Layout>
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data, status } = response
        const props: Props = {
            questions: data.data,
            query: { option: queryOptions.notSolved },
        }
        return { props }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return { notFound: true }
        }
    }
    return { notFound: true }
}
export default CategorySelect
