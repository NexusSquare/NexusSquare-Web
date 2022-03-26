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
import { copyFile } from "fs";

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
    try{
        const url:string = defaultUrl+`/${params.id}`
        const response: AxiosResponse<perfectQuestion> = await axios.get(url)
        const { data,status } = response
        if(status !== 200 || !data){
            return { notFound:true }
        }
        const props:Props = {
            content:data
        }
        return { props:props,revalidate:10 }
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message)
            return { notFound:true }
        }
    }
    return { notFound:true }
}
export const getStaticPaths = async () => {
    interface Params{
        params:{
            id:string
        }
    }
    try{
        const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
        const response: AxiosResponse<question[]> = await axios.get(defaultUrl)
        const { data,status } = response
        if(status !== 200 || !data){
            return { paths:[],fallback:true }
        }
        const paths:Params[] = data.map((question) => {
            const param:Params = {
                params:{id:question.id}
            }
            return param
        })
        return { paths:paths,fallback: true,}
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message)
            return { paths:[],fallback:true }
        }
    }
    return { paths:[],fallback: true,}
};
//ここまで
export default Question