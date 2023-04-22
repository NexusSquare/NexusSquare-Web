import { useDisclosure, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { QueryObserverResult } from 'react-query'
import { ERROR_MESSAGE } from '../../../constants/errors'
import { useErrorToast } from '../../../hooks/toast/useErrorToast'
import { useDeleteQuestion } from '../../../hooks/question/useDeleteQuestion'
import { useUpdateQuestion } from '../../../hooks/question/useUpdateQuestion'
import { QuestionReq } from '../../../api/req'
import { Question } from '../../../entities/qa'
import { NoCards } from '../../ui/common/NoCards'
import { QASkeleton } from '../../ui/features/QASkeleton'
import { QuestionCard } from './_QuestionCard'
import { DeleteFormModal } from '../../ui/features/QA/DeleteFormModal'
import { EditFormModal } from '../../ui/features/QA/question/EditFormModal'
import { Refetch } from '../../../hooks/react-query/type'

interface Props {
    isMine: boolean
    userId: string
    questions: Question[]
    isLoading: boolean
    onClickCard: (value: string) => void
    refetchQuestions: Refetch<Question[]>
}
export const QuestionList = ({
    isMine,
    questions,
    isLoading,
    onClickCard,
    refetchQuestions,
    userId,
}: Props): JSX.Element => {
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
                <VStack as="section" w="full" spacing={0}>
                    <QASkeleton />
                    <QASkeleton />
                    <QASkeleton />
                </VStack>
            ) : (
                <VStack as="section" w="full" spacing={0}>
                    {questions.length > 0 ? (
                        <>
                            {questions.map((questions: Question) => {
                                return (
                                    <QuestionCard
                                        isMine={isMine}
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
                        <NoCards text="質問はまだありません。" />
                    )}
                </VStack>
            )}
        </>
    )
}
