import { useDisclosure, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { QueryObserverResult } from 'react-query'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { LINKS } from '../../../../constants/links'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { useDeleteQuestion } from '../../../../hooks/question/useDeleteQuestion'
import { useUpdateQuestion } from '../../../../hooks/question/useUpdateQuestion'
import { Refetch } from '../../../../hooks/react-query/type'
import { useSession } from '../../../../hooks/useSession'
import { QuestionReq } from '../../../../types/api/req'
import { Question } from '../../../../types/domain/qa'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import { QuestionCard } from '../../../molecules/profile/QuestionCard'
import { DeleteFormModal } from '../../../molecules/qa/DeleteFormModal'
import { EditFormModal } from '../../../molecules/qa/question/EditFormModal'

interface Props {
    userId: string
    questions: Question[]
    isLoading: boolean
    onClickCard: (value: string) => void
    refetchQuestions: () => Promise<void>
}
export const QuestionList = ({ questions, isLoading, onClickCard, refetchQuestions, userId }: Props): JSX.Element => {
    const errorToast = useErrorToast()
    const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[0])
    const {
        mutate: updateQuestion,
        isLoading: isUpdateLoading,
        cacheClearQuestion: cacheClearForUpdate,
    } = useUpdateQuestion()
    const {
        mutate: deleteQuestion,
        isLoading: isDeleteLoading,
        cacheClearQuestion: cacheClearForDelete,
    } = useDeleteQuestion()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()

    const onClickDetail = (question: Question) => {
        setSelectedQuestion(question)
    }

    const onSuccessUpdateQuestion = async () => {
        await refetchQuestions()
        cacheClearForUpdate(userId)
        onCloseEditForm()
    }

    const onSuccessDeleteQuestion = async () => {
        await refetchQuestions()
        cacheClearForDelete(userId)
        onCloseDeleteForm()
    }

    const onClickUpdateQuestion = async (questionReq: QuestionReq) => {
        updateQuestion(
            {
                questionReq: questionReq,
                questionId: selectedQuestion.questionId,
            },
            {
                onSuccess: () => onSuccessUpdateQuestion(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
            }
        )
    }

    const onClickDeleteQuestion = async () => {
        deleteQuestion(selectedQuestion.questionId, {
            onSuccess: async () => onSuccessDeleteQuestion(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    return (
        <>
            {isLoading || !questions ? (
                <VStack as="section" w="full" spacing={0} pb="24">
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0} pb="24">
                    {questions.length > 0 ? (
                        <>
                            {questions.map((questions: Question) => {
                                return (
                                    <QuestionCard
                                        question={questions}
                                        key={questions.questionId}
                                        onOpenEditForm={onOpenEditForm}
                                        onOpenDeleteForm={onOpenDeleteForm}
                                        onClickCard={onClickCard}
                                        onClickDetail={onClickDetail}
                                    />
                                )
                            })}
                            {selectedQuestion && (
                                <EditFormModal
                                    onClose={onCloseEditForm}
                                    isOpen={isOpenEditForm}
                                    question={selectedQuestion}
                                    onClickUpdateQuestion={onClickUpdateQuestion}
                                    isUpdateLoading={isUpdateLoading}
                                />
                            )}
                            <DeleteFormModal
                                onClose={onCloseDeleteForm}
                                isOpen={isOpenDeleteForm}
                                onClickDelete={onClickDeleteQuestion}
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
