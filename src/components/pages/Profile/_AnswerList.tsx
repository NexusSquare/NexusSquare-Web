import { useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ERROR_MESSAGE } from '../../../constants/errors'
import { useDeleteAnswer } from '../../../hooks/answer/useDeleteAnswer'
import { useUpdateAnswer } from '../../../hooks/answer/useUpdateAnswer'
import { useErrorToast } from '../../../hooks/toast/useErrorToast'
import { AnswerReq } from '../../../api/req'
import { Answer } from '../../../entities/qa/Answer'
import { NoCards } from '../../ui/common/NoCards'
import { QASkeleton } from '../../ui/features/QASkeleton'
import { AnswerCard } from './_AnswerCard'
import { EditFormModal } from '../../ui/features/QA/answer/EditFormModal'
import { DeleteFormModal } from '../../ui/features/QA/DeleteFormModal'
import { Refetch } from '../../../hooks/react-query/type'

interface Props {
    isMine: boolean
    userId: string
    answers: Answer[]
    isLoading: boolean
    onClickCard: (value: string) => void
    refetchAnswers: Refetch<Answer[]>
}
export const AnswerList = ({ isMine, answers, isLoading, onClickCard, userId, refetchAnswers }: Props) => {
    const errorToast = useErrorToast()
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>(answers[0])
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()
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
        await refetchAnswers()
        console.log('refetchAnswers')
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
        await refetchAnswers()
        onCloseDeleteForm()
    }
    const onClickDeleteAnswer = async () => {
        deleteAnswer(selectedAnswer.answerId, {
            onSuccess: async () => onSuccessDeleteAnswer(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }
    return (
        <>
            {isLoading || !answers ? (
                <VStack as="section" w="full" spacing={0}>
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0}>
                    {answers.length > 0 ? (
                        <>
                            {answers.map((answer: Answer) => {
                                return (
                                    <AnswerCard
                                        isMine={isMine}
                                        answer={answer}
                                        key={answer.answerId}
                                        onOpenEditForm={onOpenEditForm}
                                        onOpenDeleteForm={onOpenDeleteForm}
                                        onClickCard={onClickCard}
                                        onClickDetail={onClickDetail}
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
                        </>
                    ) : (
                        <NoCards text="回答はまだありません。" />
                    )}
                </VStack>
            )}
        </>
    )
}
