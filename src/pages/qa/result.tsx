import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Result/Page'
import queryOptions from '../../constants/qa/queryOptions'
import QAResponse from '../../types/api/res/qa/qaResponse'
import Question from '../../types/domain/qa/Question'

interface Props {
    questions: Question[]
    title: string | string[]
}

const SearchResult: NextPageWithLayout<Props> = ({ questions, title }) => <Page questions={questions} title={title} />

SearchResult.getLayout = (page) => <Layout pageName="検索結果">{page}</Layout>

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        const title: string | string[] = context.query.title ? context.query.title : ''
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data, status } = response
        const props: Props = {
            questions: data.data,
            title: title,
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
export default SearchResult
