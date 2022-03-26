import { Box, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Router, useRouter } from "next/router";
import QAResponse from "../../entity/qa/qaResponse";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import perfectQuestion from "../../entity/qa/perfectQuestion";
import QALayout from "../../components/qa/qaLayout";
import perfectQResponse from "../../entity/qa/perfectQuestionResponse";
import question from "../../entity/qa/question";
import Error from "next/error";

interface Props{
    content:perfectQuestion
}

const Question = (props:Props) => {
    const router = useRouter()
    if(!router.isFallback && !props.content) router.push("/404")
    return (
        <QALayout>
            <VStack w={{ base:"100%",sm:"100vw",md:"calc(100vw - 270px)",lg:"calc(100vw - 210px)" ,"xl":"calc(400px + 50vw)" }} paddingLeft={{base:"0",sm:"60px",md:"calc((100vw - 800px) / 2)"}}>
                <VStack bgColor="red"></VStack>
            </VStack>
        </QALayout>
    )
}
export const getStaticProps: GetStaticProps<Props> = async({params}) => {
    const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
    if(!params) return { notFound:true}
    const url:string = defaultUrl+`/${params.id}`
    console.log(url)
    const {data,status} = await axios.get(url)
    .then(
        (res: AxiosResponse<perfectQuestion>) => {
            const {data,status} = res
            return {data,status}
        }
    ).catch(
        //ここ書き直す(デモの後)
        (res) => {
            throw Error
        }
    )
    console.log("content="+data)
    if(status !== 200 || !data){
        return { notFound:true }
    }
    const props:Props = {
        content:data
    }
    const testCon: perfectQuestion = {
        id: "Q-10",
        createAt:"2022-11-10",
        category1:"情報科学", 
        category2:"履修登録",
        title:"履修登録がわからない",
        postedBy:"太郎",
        content:"履修登録がわからないんだけどどうすれば良い？",
        ansNum:0,
        }
    const testProps:Props = {
        content:testCon
    }
    return { props:testProps,revalidate:10 }
}
export const getStaticPaths = async () => {
    interface Params{
        params:{
            id:string
        }
    }
    const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
    const content: question[] = await axios.get(defaultUrl).then((res: AxiosResponse<QAResponse>) => res.data.data)
    const paths:Params[] = content.map((question) => {
        const param:Params = {
            params:{id:question.id}
        }
        return param
    })
    return { paths:paths,fallback: true,}
};
//ここまで
export default Question