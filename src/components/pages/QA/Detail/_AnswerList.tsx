import { Box, VStack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { USER_ID } from '../../../../constants/token'
import { useDeleteAnswer } from '../../../../hooks/answer/useDeleteAnswer'
import { useUpdateAnswer } from '../../../../hooks/answer/useUpdateAnswer'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { useBestAnswer } from '../../../../hooks/question/useUpdateQuestion'
import { useReport } from '../../../../hooks/report/useReport'
import { useUser } from '../../../../store/atom'
import { AnswerReq, ReportReq } from '../../../../api/req'
import { Answer } from '../../../../entities/qa/Answer'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import AnswerCard from './_AnswerCard'
import { BestAnswerModal } from '../../../molecules/qa/answer/BestAnswerModal'
import { EditFormModal } from '../../../molecules/qa/answer/EditFormModal'
import { DeleteFormModal } from '../../../molecules/qa/DeleteFormModal'
import { ReportFormModal } from '../../../molecules/qa/ReportFromModal'
import { Refetch } from '../../../../hooks/react-query/type'

interface Props {
    questionId: string
    answers: Answer[]
    isFetchLoading: boolean
    isMine: boolean
    isOpenBestAnswerForm: boolean
    onOpenBestAnswerForm: () => void
    onCloseBestAnswerForm: () => void
    onClickBestAnswer: (value: string) => void
    isDeclareLoading: boolean
    bestAnswerId?: string
    refetchAnswers: Refetch<Answer[]>
}

export const AnswerList = ({
    questionId,
    answers,
    isFetchLoading,
    isMine,
    isOpenBestAnswerForm,
    onOpenBestAnswerForm,
    onCloseBestAnswerForm,
    onClickBestAnswer,
    isDeclareLoading,
    bestAnswerId,
    refetchAnswers,
}: Props) => {
    const userId = useUser().user?.userId
    const errorToast = useErrorToast()
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>(answers[0])
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()
    const { isOpen: isOpenReportForm, onOpen: onOpenReportForm, onClose: onCloseReportForm } = useDisclosure()

    const { mutate: report, isLoading: isReportLoading } = useReport()

    const {
        mutate: updateAnswer,
        isLoading: isUpdateLoading,
        cacheClearAnswer: cacheClearForUpdate,
    } = useUpdateAnswer()
    const {
        mutate: deleteAnswer,
        isLoading: isDeleteLoading,
        cacheClearAnswer: cacheClearForDelete,
    } = useDeleteAnswer()

    const onClickDetail = (answer: Answer) => {
        setSelectedAnswer(answer)
    }
    const onSuccessUpdateAnswer = async () => {
        cacheClearForUpdate(userId!, questionId)
        refetchAnswers()
        onCloseEditForm()
    }
    const onClickUpdateAnswer = async (answerReq: AnswerReq) => {
        updateAnswer(
            {
                answerReq: answerReq,
                answerId: selectedAnswer.answerId,
            },
            {
                onSuccess: () => onSuccessUpdateAnswer(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
            }
        )
    }
    const onSuccessDeleteAnswer = async () => {
        cacheClearForDelete(userId!, questionId)
        refetchAnswers()
        onCloseDeleteForm()
    }
    const onClickDeleteAnswer = async () => {
        deleteAnswer(selectedAnswer.answerId, {
            onSuccess: async () => onSuccessDeleteAnswer(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }
    const onClickReport = async (reportReq: ReportReq) => {
        report(reportReq, {
            onSuccess: () => onCloseReportForm(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    const onOpenBestAnswerModal = (answer: Answer) => {
        setSelectedAnswer(answer)
        onOpenBestAnswerForm()
    }

    if (!userId) return null
    return (
        <>
            <Text as="h2" fontSize="xl" fontWeight="semibold" w="full" pl="4">
                回答：
                <Box as="span" color={'mainColor'} mr="2">
                    {answers.length}
                </Box>
                件
            </Text>
            {isFetchLoading || !answers ? (
                <VStack as="section" w="full" spacing={0} pb="24">
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0} pb="24">
                    {answers.length > 0 ? (
                        <>
                            {answers.map((answer: Answer, index: number) => {
                                return (
                                    <AnswerCard
                                        answer={answer}
                                        key={index}
                                        userId={userId}
                                        onOpenEditForm={onOpenEditForm}
                                        onOpenDeleteForm={onOpenDeleteForm}
                                        onOpenReportForm={onOpenReportForm}
                                        onClickDetail={onClickDetail}
                                        onOpenBestAnswerModal={onOpenBestAnswerModal}
                                        isMyQuestion={isMine}
                                        bestAnswerId={bestAnswerId}
                                    />
                                )
                            })}
                            {selectedAnswer && (
                                <EditFormModal
                                    onClose={onCloseEditForm}
                                    isOpen={isOpenEditForm}
                                    answer={selectedAnswer}
                                    onClickUpdate={onClickUpdateAnswer}
                                    isUpdateLoading={isUpdateLoading}
                                />
                            )}
                            <DeleteFormModal
                                onClose={onCloseDeleteForm}
                                isOpen={isOpenDeleteForm}
                                onClickDelete={onClickDeleteAnswer}
                                isDeleteLoading={isDeleteLoading}
                            />
                            <ReportFormModal
                                onClose={onCloseReportForm}
                                isOpen={isOpenReportForm}
                                isReportLoading={isReportLoading}
                                onClickReport={onClickReport}
                                type="answer"
                                postId={questionId}
                            />
                            <BestAnswerModal
                                isOpen={isOpenBestAnswerForm}
                                onClose={onCloseBestAnswerForm}
                                isLoading={isDeclareLoading}
                                onClick={() => onClickBestAnswer(selectedAnswer.answerId)}
                            />
                        </>
                    ) : (
                        <NoCards text="回答はまだありません。" />
                    )}
                </VStack>
            )}
        </>
    )
}
