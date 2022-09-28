import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
    Image,
    ModalBody,
    ModalFooter,
    Spacer,
    Text,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import { BsChatRightText } from 'react-icons/bs'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import QAResponse from '../../../../types/api/res//qa/qaResponse'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import PerfectQuestion from '../../../../types/domain/qa/PerfectQuestion'

import answerResponse from '../../../../types/api/res/qa/answerResponse'
import Answer from '../../../../types/domain/qa/Answer'
import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { QAPerfectCard } from '../../../../components/qa/QAPerfectCard'
import AnswerCard from '../../../../components/qa/AnswerCard'
import { DefaultModal } from '../../../../components/common/DefaultModal'
import { ChancelButton } from '../../../../components/common/ChancelButton'
import { PrimaryButton } from '../../../../components/common/PrimaryButton'
import { useForm } from 'react-hook-form'
import { PostForm } from '../../../../components/qa/PostForm'

interface Props {
    question: PerfectQuestion
}

export const Page = ({ question }: Props): JSX.Element => {
    const router = useRouter()
    const [answers, setAnswers] = useState<Answer[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const session = undefined

    const onSubmitHandler = (submitValue: { content: string }) => {
        const userId: string = 'session?.user?.email!'
        const questionId: string = 'question.id'
        const postBy: string = 'session?.user?.name!'
    }
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GET_QUESTION_URL) {
            console.error('urlの読み込みに失敗しました')
            setAnswers([])
        }
        const url = `http://localhost:4000/dev/question/${question.id}/answer`
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
                const resAns: Answer[] = data.data
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
                {answers.map((answer: Answer) => {
                    return <AnswerCard answer={answer} key={answer.id} />
                })}
            </VStack>
        )
    }, [answers])

    if (!router.isFallback && !question) router.push('/404')
    if (router.isFallback) {
        return <Box>now loading</Box>
    }
    return (
        <VStack paddingTop={8} paddingX={4}>
            <QAPerfectCard question={question} />
            <Button
                bgColor="mainColor"
                color="white"
                _hover={{ bgColor: 'subSubColor' }}
                leftIcon={<BsChatRightText />}
                onClick={onOpen}
                alignSelf={'end'}
            >
                回答
            </Button>
            <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
                <PostForm onClose={onClose} />
            </DefaultModal>
            <VStack as="section" w="full" spacing={2}>
                <Text as="h2" fontSize="2xl" fontWeight="semibold" w="full">
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
        </VStack>
    )
}
