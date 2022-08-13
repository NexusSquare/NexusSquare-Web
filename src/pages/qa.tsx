import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import QAListLayout from '../components/qa/QAListLayout'
import QAResponse from '../types/api/res/qa/qaResponse'
import question from '../types/domain/qa/question'
import queryOptions from '../groupObject/qa/queryOptions'

interface Props {
    content: question[]
}

const QAHome = (props: Props) => {
    console.log(props.content)
    return (
        <QAListLayout pageName="QAトップ" data={props.content}>
            <Box h="100px" w="100%" display="flex" alignItems="center">
                <Text paddingLeft={{ base: '5%', md: '10%' }} fontSize="4xl" textAlign="left">
                    最新の投稿
                </Text>
            </Box>
        </QAListLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data, status } = response
        const props: Props = {
            content: data.data,
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
export default QAHome
