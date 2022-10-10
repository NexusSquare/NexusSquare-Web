import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { BsChatText } from 'react-icons/bs'
import { Router, useRouter } from 'next/router'
import { QAPerfectCard } from '../../../../components/qa/QAPerfectCard'
import AnswerCard from '../../../../components/qa/AnswerCard'
import { PostFormModal } from '../../../qa/PostFormModal'
import { EditFormModal } from '../../../qa/EditFormModal'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../types/domain/qa/Answer'
import { QASkeleton } from '../../../qa/QASkeleton'
import { AnswerReq, QuestionReq } from '../../../../types/api/req'
import { useUpdateQuestion } from '../../../../hooks/question/useUpdateQuestion'
import { useDeleteQuestion } from '../../../../hooks/question/useDeleteQuestion'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { DeleteFormModal } from '../../../qa/DeleteFormModal'
import { LINKS } from '../../../../constants/links'
import { ReportFormModal } from '../../../qa/ReportFromModal'
import { useReport } from '../../../../hooks/report/useReport'
import { ReportReq } from '../../../../types/api/req/ReportReq'
import { useEffect } from 'react'
import { usePostAnswer } from '../../../../hooks/answer/usePostAnswer'
import { usePostQuestion } from '../../../../hooks/question'
import { useUser } from '../../../../store/atom'
import { useFetchAnswersByQuestionId } from '../../../../hooks/answer/useFethcAnswer'
import Link from 'next/link'

interface Props {
    questionId: string
}

export const Page = ({ questionId }: Props): JSX.Element => {
    const router = useRouter()
    const errorToast = useErrorToast()
    const { user: postUser } = useUser()
    const { data: question, isLoading, refetch: refetchQuestion } = useFetchQuestion(questionId)
    const {
        data: answers = [],
        isLoading: isFetchAnswersLoading,
        refetch: refetchAnswers,
    } = useFetchAnswersByQuestionId(questionId)
    const { mutate: updateQuestion, isLoading: isUpdateLoading } = useUpdateQuestion()
    const { mutate: deleteQuestion, isLoading: isDeleteLoading } = useDeleteQuestion()
    const { mutate: postAnswer, isLoading: isPostLoading } = usePostAnswer()
    const { mutate: report, isLoading: isReportLoading } = useReport()

    const { isOpen: isOpenPostForm, onOpen: onOpenPostForm, onClose: onClosePostForm } = useDisclosure()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()
    const { isOpen: isOpenReportForm, onOpen: onOpenReportForm, onClose: onCloseReportForm } = useDisclosure()

    const onClickUpdateQuestion = async (questionReq: QuestionReq) => {
        updateQuestion(
            {
                questionReq: questionReq,
                questionId: questionId,
            },
            {
                onSuccess: () => refetchQuestion(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
                onSettled: () => onCloseEditForm(),
            }
        )
    }

    const onClickDeleteQuestion = async () => {
        deleteQuestion(questionId, {
            onSuccess: () => router.push(LINKS.QUESTION),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onClosePostForm(),
        })
    }

    const onClickReportFrom = () => {
        onOpenReportForm()
    }

    const onClickReport = async (reportReq: ReportReq) => {
        report(reportReq, {
            onSuccess: () => router.push(LINKS.QUESTION),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseReportForm(),
        })
    }

    const onClickPostAnswer = async (answerReq: AnswerReq) => {
        if (!postUser) return
        postAnswer(
            { answerReq, postUser },
            {
                onSuccess: () => refetchAnswers(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
                onSettled: () => onClosePostForm(),
            }
        )
    }

    return (
        <VStack w="full" spacing={2}>
            <HStack w={'full'} pt="4" px="4">
                <Link href="/qa" passHref>
                    <Text as="a" fontSize="lg" fontWeight="bold" cursor="pointer">
                        <Box as="span" color="mainColor">
                            ◀︎
                        </Box>
                        ホーム
                    </Text>
                </Link>
            </HStack>
            {isLoading || !question ? (
                <QASkeleton />
            ) : (
                <>
                    <QAPerfectCard
                        question={question}
                        onOpenEditForm={onOpenEditForm}
                        onOpenDeleteForm={onOpenDeleteForm}
                        onOpenReportForm={onClickReportFrom}
                        onOpenPostForm={onOpenPostForm}
                    />
                    <EditFormModal
                        onClose={onCloseEditForm}
                        isOpen={isOpenEditForm}
                        question={question}
                        onClickUpdateQuestion={onClickUpdateQuestion}
                        isUpdateLoading={isUpdateLoading}
                    />
                </>
            )}
            <DeleteFormModal
                onClose={onCloseDeleteForm}
                isOpen={isOpenDeleteForm}
                onClickDeleteQuestion={onClickDeleteQuestion}
                isDeleteLoading={isDeleteLoading}
            />
            <ReportFormModal
                onClose={onCloseReportForm}
                isOpen={isOpenReportForm}
                isReportLoading={isReportLoading}
                onClickReport={onClickReport}
                type="question"
                postId={questionId}
            />
            <PostFormModal
                onClose={onClosePostForm}
                isOpen={isOpenPostForm}
                questionId={questionId}
                isPostLoading={isPostLoading}
                onClickPost={onClickPostAnswer}
            />

            <HStack py="12">
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
            </HStack>
            <Text as="h2" fontSize="2xl" fontWeight="semibold" w="full" pl="4">
                回答：
                <Box as="span" color={'mainColor'} mr="2">
                    {answers.length}
                </Box>
                件
            </Text>
            {isFetchAnswersLoading || !answers ? (
                <VStack as="section" w="full" spacing={0} pb="24">
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0}>
                    {answers.length > 0 ? (
                        <Box mb="24">
                            {answers.map((answer: Answer, index: number) => {
                                return <AnswerCard answer={answer} key={index} />
                            })}
                        </Box>
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
            )}
        </VStack>
    )
}
