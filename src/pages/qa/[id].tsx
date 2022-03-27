import { Box, HStack, IconButton, Image, Spacer, Text, VStack } from "@chakra-ui/react";
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
import ChakraNextImage from "../../components/common/chakraNextImage";
import { NotAllowedIcon } from "@chakra-ui/icons";
import DefaultFooter from "../../components/common/defaultFooter";
import QAFooter from "../../components/qa/qaFooter";
import answerResponse from "../../entity/qa/answerResponse";
import answer from "../../entity/qa/answer";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";

interface Props{
    content:perfectQuestion
}

const Question: NextPage<Props> = ({content}) => {
    const router = useRouter()
    if(!router.isFallback && !content) router.push("/404")
    if(router.isFallback){
        return (
            <Box>now loading</Box>
        )
    }
    const DEFAULT_ICON_IMAGE_PATH: string = (process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH) ? `/images/${process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH}` : ""
    const question: perfectQuestion = content
    const canselToken = axios.CancelToken
    const source = canselToken.source()
    const [answers,setAnswers] = useState<answer[]>([])
    const ICON_IMAGE_URL: string = (question.userIcon) ? question.userIcon : DEFAULT_ICON_IMAGE_PATH
    const REGEX: RegExp = /^([1-9][0-9]{3})\-0*([1-9]|1[0-2])\-0*([1-9]|[1-2][0-9]|3[01])/
    const createTimeResult = content.createAt.match(REGEX)
    const updateTimeResult = content.updateAt.match(REGEX)
    const createDate: string = (createTimeResult) ? `${createTimeResult[1]}年${createTimeResult[2]}月${createTimeResult[3]}日` : "読み込めませんでした"
    const updateDate: string = (updateTimeResult) ? `${updateTimeResult[1]}年${updateTimeResult[2]}月${updateTimeResult[3]}日` : "読み込めませんでした"
    const categoryTxt = (content.category2) ? `${content.category1}、${content.category2}` : content.category1
    const ContentImage = () => {
        return (content.imageUrl) ? (
            <Box>
                <ChakraNextImage src={content.imageUrl} alt="質問の画像" width={200} height={200} />
            </Box>
        ) : (
            <Box></Box>
        )
    }
    useEffect(() => {
        if(!process.env.NEXT_PUBLIC_GET_QUESTION_URL){
            console.error("urlの読み込みに失敗しました")
            setAnswers([])
        }
        const url = `${process.env.NEXT_PUBLIC_GET_QUESTION_URL}/${content.id}/answer`
        const getAnswers = async() =>{
            try{
                const response: AxiosResponse<answerResponse> = await axios.get(url,{cancelToken: source.token})
                const {data,status} = response
                if(status !== 200){
                    console.error("リクエストが不正です")
                    setAnswers([])
                    return
                }
                console.log("取得した")
                const resAns: answer[] = data.data
                setAnswers((nowans)=>([...nowans,...resAns]))
            }catch(error){
                if(axios.isAxiosError(error)){
                    console.log("アキシオスエラー")
                    setAnswers([])
                }
            }
            console.log("関数は実行した")
        }
        getAnswers()
        return () => { source.cancel("fetch in useEffect is cancelled by creater ") }
    },[])
    const AnswerList = useCallback(() => {
        if(!Array.isArray(answers)){
            return (<Box>回答の取得に失敗しました</Box>)
        }else if(answers.length < 1){
            return(<Box>この質問への回答はまだありません</Box>)
        }
        return (
            <VStack>
                {answers.map(
                    (answer: answer) => {
                        const userImage: string = (answer.userIcon) ? answer.userIcon : DEFAULT_ICON_IMAGE_PATH
                        return (<VStack key={answer.id}> 
                            <HStack>
                                <Box as="figure" width="30px" height="30px" >
                                    <ChakraNextImage src={userImage} alt="回答者アイコン" borderRadius="50%" width={30} height={30} />
                                </Box>
                                <VStack spacing="0px">
                                    <Text fontWeight="400">{answer.postedby}</Text>
                                    <HStack>
                                        <Text fontWeight="400" fontSize="sm" color="gray.400">作成日:{answer.createAt}</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <Text>{answer.content}</Text>
                        </VStack>
                    )}
                )}
            </VStack>
        )
    },[answers])

    return (
        <QALayout>
            <VStack as="article" w={{ base:"100%",sm:"100vw",md:"calc(100vw - 270px)",lg:"calc(100vw - 210px)" ,"xl":"calc(400px + 50vw)" }} paddingLeft={{base:"0",sm:"60px",md:"calc((100vw - 800px) / 2)"}} paddingTop="100px">
                <VStack as="section" bgColor="red" w="90%" minH="300px">
                    <HStack>
                        <Box as="figure" width="30px" height="30px" >
                            <ChakraNextImage src={ICON_IMAGE_URL} alt="プロフィール" borderRadius="50%" width={30} height={30} />
                        </Box>
                        <VStack spacing="0px">
                            <Text fontWeight="400">{content.postedBy}</Text>
                            <HStack>
                                <Text fontWeight="400" fontSize="sm" color="gray.400">作成日:{createDate}</Text>
                                <Text fontWeight="400" fontSize="sm" color="gray.400">更新日:{updateDate}</Text>
                            </HStack>
                        </VStack>
                        <Spacer />
                        <HStack>
c                           <Text as="h2">{content.ansNum}</Text>
                            <Text>回答</Text>
                        </HStack>
                    </HStack>
                    <Text fontSize="4xl" fontWeight="semibold">{content.title}</Text>
                    <Text color="gray.400">{categoryTxt}</Text>
                    <Text>{content.content}</Text>
                    <ContentImage />
                    <Spacer />
                    <HStack w="100%">
                        <Spacer />
                        <IconButton aria-label="通報する" icon={<NotAllowedIcon />}></IconButton>
                    </HStack>
                </VStack>
                <HStack w="100%" h="200px">
                    <Box w="180px" h="180px" bgColor="red">広告枠</Box>
                    <Box  w="180px" h="180px" bgColor="red">広告枠</Box>
                </HStack>
                <VStack as="section">
                    <Text as="h2" fontSize="4xl" fontWeight="semibold">Answer</Text>
                    <AnswerList />
                </VStack>
                <QAFooter />
            </VStack>
        </QALayout>
    )
}
export const getStaticProps: GetStaticProps<Props> = async({params}) => {
    const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
    if(!params) {
        console.error("urlパスパラメータが確認できません")
        return { 
        notFound:true
    }}
    try{
        const url:string = defaultUrl+`/${params.id}`
        const response: AxiosResponse<perfectQuestion> = await axios.get(url)
        const { data,status } = response
        if(status !== 200 || !data){
            console.error("質問の取得に失敗しました")
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
    console.error("not found")
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
export default Question