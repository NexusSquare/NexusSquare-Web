import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, GetStaticProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Detail/Page'
import queryOptions from '../../constants/qa/queryOptions'
import QAResponse from '../../types/api/res/qa/qaResponse'
import PerfectQuestion from '../../types/domain/qa/PerfectQuestion'
import Question from '../../types/domain/qa/Question'

interface Props {
    question: PerfectQuestion
}

const Detail: NextPageWithLayout<Props> = ({ question }) => <Page question={question} />

Detail.getLayout = (page) => <Layout pageName="Q&A一覧">{page}</Layout>
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const defaultUrl: string = process.env.GET_QUESTION_URL
        ? process.env.GET_QUESTION_URL
        : 'http://localhost:4000/dev/question'
    if (!params) {
        console.error('urlパスパラメータが確認できません')
        return {
            notFound: true,
        }
    }
    try {
        const url: string = defaultUrl + `/${params.id}`
        const response: AxiosResponse<PerfectQuestion> = await axios.get(url)
        console.log(url)
        const { data, status } = response
        if (status !== 200 || !data) {
            console.error('質問の取得に失敗しました')
            return { notFound: true }
        }
        const props: Props = {
            question: data,
        }
        console.log(props.question)
        return { props: props, revalidate: 10 }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return { notFound: true }
        }
    }
    console.error('not found')
    return { notFound: true }
}
export const getStaticPaths = async () => {
    interface Params {
        params: {
            id: string
        }
    }
    try {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        const response: AxiosResponse<Question[]> = await axios.get(defaultUrl)
        const { data, status } = response
        if (status !== 200 || !data) {
            return { paths: [], fallback: true }
        }
        const paths: Params[] = data.map((question) => {
            const param: Params = {
                params: { id: question.id },
            }
            return param
        })
        return { paths: paths, fallback: true }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return { paths: [], fallback: true }
        }
    }
    return { paths: [], fallback: true }
}
export default Question
