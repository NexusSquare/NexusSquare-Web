import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { BsChatText } from 'react-icons/bs'
import { Router, useRouter } from 'next/router'
import { QAPerfectCard } from '../../../../components/qa/QAPerfectCard'
import AnswerCard from '../../../../components/qa/AnswerCard'
import { DefaultModal } from '../../../../components/common/DefaultModal'
import { PostForm } from '../../../../components/qa/PostForm'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../types/domain/qa/Answer'
import { QASkeleton } from '../../../qa/QASkeleton'

interface Props {
    questionId: string
}

export const Page = ({ questionId }: Props): JSX.Element => {
    const router = useRouter()
    // const [answers, setAnswers] = useState<Answer[]>([])
    const { data: question, isLoading } = useFetchQuestion(questionId)
    const answers: Answer[] = []
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack paddingTop={8} w="full" spacing={2}>
            {isLoading || !question ? <QASkeleton /> : <QAPerfectCard question={question} />}
            <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
                <PostForm onClose={onClose} />
            </DefaultModal>
            <HStack py="12">
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
            </HStack>
            <Text as="h2" fontSize="2xl" fontWeight="semibold" w="full" pl="4">
                回答：{answers.length}件
            </Text>
            <Divider />
            <VStack as="section" w="full">
                {answers.length > 0 ? (
                    <>
                        {answers.map((answer: Answer, index: number) => {
                            return <AnswerCard answer={answer} key={index} />
                        })}
                    </>
                ) : (
                    <>
                        <HStack justify={'center'} py="4" h="50vh">
                            <VStack>
                                <BsChatText color={'#a0acc0'} size={100} />
                                <Text color="gray.400">回答はまだありません。</Text>
                            </VStack>
                        </HStack>
                    </>
                )}
            </VStack>
        </VStack>
    )
}
