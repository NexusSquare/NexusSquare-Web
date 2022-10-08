import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { BsChatRightText } from 'react-icons/bs'
import { Router, useRouter } from 'next/router'
import { QAPerfectCard } from '../../../../components/qa/QAPerfectCard'
import AnswerCard from '../../../../components/qa/AnswerCard'
import { DefaultModal } from '../../../../components/common/DefaultModal'
import { PostForm } from '../../../../components/qa/PostForm'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'

interface Props {
    questionId: string
}

export const Page = ({ questionId }: Props): JSX.Element => {
    const router = useRouter()
    // const [answers, setAnswers] = useState<Answer[]>([])
    const { data: question, isLoading } = useFetchQuestion(questionId)
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const AnswerList = useCallback(() => {
    //     if (!Array.isArray(answers)) {
    //         return <Box>回答の取得に失敗しました</Box>
    //     } else if (answers.length < 1) {
    //         return <Box>この質問への回答はまだありません</Box>
    //     }
    //     return (
    //         <VStack w="full" spacing={0}>
    //             {answers.map((answer: Answer) => {
    //                 return <AnswerCard answer={answer} key={answer.id} />
    //             })}
    //         </VStack>
    //     )
    // }, [answers])

    // if (!router.isFallback && !question) router.push('/404')
    // if (router.isFallback) {
    //     return <Box>now loading</Box>
    // }
    return (
        <VStack paddingTop={8} paddingX={4} w="full">
            {question && <QAPerfectCard question={question} />}

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
                {/* <AnswerList /> */}
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
