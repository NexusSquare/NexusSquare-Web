import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage, NextPageWithLayout } from 'next'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Page'
import queryOptions from '../../constants/qa/queryOptions'
import { Question } from '../../types/domain/qa'

interface Props {
    questions: Question[]
}

const QAHome: NextPageWithLayout = () => <Page />

QAHome.getLayout = (page) => <Layout pageName="Q&Aトップ">{page}</Layout>

// export const getServerSideProps: GetServerSideProps = async () => {
//     try {
//         const defaultUrl: string = process.env.GET_QUESTION_URL
//             ? process.env.GET_QUESTION_URL
//             : 'http://localhost:4000/dev/question'
//         const url = defaultUrl + `?option=${queryOptions.notSolved}`
//         const response: AxiosResponse<QAResponse> = await axios.get(url)
//         const { data, status } = response
//         const props: Props = {
//             questions: data.data,
//         }
//         return { props }
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error(error.message)
//             return { notFound: true }
//         }
//     }
//     return { notFound: true }
// }
// export default QAHome
