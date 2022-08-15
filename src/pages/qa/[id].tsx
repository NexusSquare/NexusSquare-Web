import { Box, Button, Divider, HStack, IconButton, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import { BsChatRightText } from 'react-icons/bs'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import QAResponse from '../../types/api/res//qa/qaResponse'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import PerfectQuestion from '../../types/domain/qa/PerfectQuestion'
import QALayout from '../../components/qa/QALayout'
import perfectQResponse from '../../types/api/res/qa/perfectQuestionResponse'
import question from '../../types/domain/qa/question'
import Error from 'next/error'
import { copyFile } from 'fs'
import ChakraNextImage from '../../components/common/chakraNextImage'
import { NotAllowedIcon } from '@chakra-ui/icons'
import DefaultFooter from '../../components/common/DefaultFooter'
import QAFooter from '../../components/qa/QAFooter'
import answerResponse from '../../types/api/res/qa/answerResponse'
import answer from '../../types/domain/qa/answer'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { QAPerfectCard } from '../../components/qa/QAPerfectCard'
import AnswerCard from '../../components/qa/AnswerCard'

interface Props {
    content: PerfectQuestion
}

const Question: NextPage<Props> = ({ content }) => {
    const router = useRouter()
    const question: PerfectQuestion = content
    const [answers, setAnswers] = useState<answer[]>([])

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GET_QUESTION_URL) {
            console.error('urlの読み込みに失敗しました')
            setAnswers([])
        }
        const url = `${process.env.NEXT_PUBLIC_GET_QUESTION_URL}/${content.id}/answer`
        let abortController = new AbortController()
        const getAnswers = async () => {
            try {
                const response: AxiosResponse<answerResponse> = await axios.get(url)
                const { data, status } = response
                if (status !== 200) {
                    console.error('リクエストが不正です')
                    setAnswers([])
                    return
                }
                console.log('取得した')
                const resAns: answer[] = data.data
                setAnswers((nowans) => [...nowans, ...resAns])
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('アキシオスエラー')
                    setAnswers([])
                }
            }
            console.log('関数は実行した')
        }
        getAnswers()
        return () => {
            abortController.abort()
        }
    }, [])

    const AnswerList = useCallback(() => {
        if (!Array.isArray(answers)) {
            return <Box>回答の取得に失敗しました</Box>
        } else if (answers.length < 1) {
            return <Box>この質問への回答はまだありません</Box>
        }
        return (
            <VStack w="full" spacing={0}>
                {answers.map((answer: answer) => {
                    return <AnswerCard answer={answer} key={answer.id} />
                })}
            </VStack>
        )
    }, [answers])

    if (!router.isFallback && !content) router.push('/404')
    if (router.isFallback) {
        return <Box>now loading</Box>
    }
    return (
        <QALayout>
            <VStack
                as="article"
                w={{
                    base: '100%',
                    sm: '100vw',
                    md: 'calc(100vw - 270px)',
                    lg: 'calc(100vw - 210px)',
                    xl: 'calc(400px + 50vw)',
                }}
                paddingLeft={{ base: '0', sm: '100px', md: 'calc((100vw - 800px) / 2)' }}
                paddingTop="100px"
                spacing="8"
            >
                <QAPerfectCard question={question} />
                <Button
                    bgColor="mainColor"
                    color="white"
                    _hover={{ bgColor: 'subSubColor' }}
                    leftIcon={<BsChatRightText />}
                >
                    回答
                </Button>
                <VStack as="section" w="full" p="5%" spacing={2}>
                    <Text as="h2" fontSize="4xl" fontWeight="semibold" w="full">
                        解答
                    </Text>
                    <Divider />
                    <AnswerList />
                </VStack>
                <HStack h="200px">
                    <Box w="180px" h="180px" bgColor="gray.200">
                        広告枠
                    </Box>
                    <Box w="180px" h="180px" bgColor="gray.200">
                        広告枠
                    </Box>
                </HStack>
                s
                <QAFooter />
            </VStack>
        </QALayout>
    )
}
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
            content: data,
        }
        console.log(props.content)
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
        const response: AxiosResponse<question[]> = await axios.get(defaultUrl)
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
