import { Box, Text } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import QAListLayout from "../../components/qa/qaListLayout";
import QAResponse from "../../entity/qa/qaResponse";
import question from "../../entity/qa/question";
import queryOptions from "../../groupObject/qa/queryOptions";

interface Props{
    content: question[],
    title: string|string[]
}

const SearchResult = (props:Props) => {
    return (
        <QAListLayout pageName="検索結果" data={props.content}>
            <Box h="100px" w="100%" marginTop={{base:'40px',md:'0px'}} display='flex' alignItems='center'>
                <Text paddingLeft={{ base:'5%',md:'10%' }} fontSize="4xl" paddingTop="30px" textAlign="left">{props.title}の検索結果</Text>
            </Box>
        </QAListLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async(context) => {
    try{
        const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
        const title: string|string[] = (context.query.title) ? context.query.title : ""
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data,status } = response
        const props:Props = {
            content: data.data,
            title:title
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
export default SearchResult