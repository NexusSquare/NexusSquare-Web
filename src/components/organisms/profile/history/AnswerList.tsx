import { useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { useDeleteAnswer } from '../../../../hooks/answer/useDeleteAnswer'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { Answer } from '../../../../types/domain/qa/Answer'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import { AnswerCard } from '../../../molecules/profile/AnswerCars'
import { DeleteFormModal } from '../../../molecules/qa/question/DeleteFormModal'

interface Props {
    userId: string
    answers: Answer[]
    isLoading: boolean
    onClickCard: (value: string) => void
}
export const AnswerList = ({ answers, isLoading, onClickCard, userId }: Props) => {
    const errorToast = useErrorToast()
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>(answers[0])
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()
    const {
        mutate: deleteAnswer,
        isLoading: isDeleteLoading,
        cacheClearAnswer: cacheClearForDelete,
    } = useDeleteAnswer()
    const onClickDetail = (answer: Answer) => {
        setSelectedAnswer(answer)
    }
    const onSuccessDeleteAnswer = async () => {
        cacheClearForDelete(userId)
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
                <VStack as="section" w="full" spacing={0} pb="24">
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0} pb="24">
                    {answers.length > 0 ? (
                        <>
                            {answers.map((answer: Answer) => {
                                return (
                                    <AnswerCard
                                        answer={answer}
                                        key={answer.answerId}
                                        onOpenEditForm={onOpenEditForm}
                                        onOpenDeleteForm={onOpenDeleteForm}
                                        onClickCard={onClickCard}
                                        onClickDetail={onClickDetail}
                                    />
                                )
                            })}
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
