import { Box, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import QAListLayout from "../../components/qa/qaListLayout";
import QAResponse from "../../entity/qa/qaResponse";
import question from "../../entity/qa/question";
import queryOptions from "../../groupObject/qa/queryOptions";

interface Props{
    content: question[]
}

const All = (props:Props) => {
    return (
        <QAListLayout pageName="Q&A一覧" data={props.content}>
            <Box h="100px" w="100%" textAlign="center">
                <Text paddingLeft="15%" fontSize="4xl" paddingTop="30px" textAlign="left">全ての投稿</Text>
            </Box>
        </QAListLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async() => {
    try{
        const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data,status } = response
        const props:Props = {
            content: data.data
        }
        return { props }
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message)
            return { notFound: true }
        }
    }
    return { notFound: true }
}
export default All