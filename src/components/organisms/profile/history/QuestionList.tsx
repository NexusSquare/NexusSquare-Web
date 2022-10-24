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
import { QuestionReq } from '../../../../types/api/req'
import { Question } from '../../../../types/domain/qa'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import { QuestionCard } from '../../../molecules/profile/QuestionCard'
import { DeleteFormModal } from '../../../molecules/qa/question/DeleteFormModal'
import { EditFormModal } from '../../../molecules/qa/question/EditFormModal'

interface Props {
    questions: Question[]
    isLoading: boolean
    onClickCard: (value: string) => void
    refetchQuestions: () => Promise<void>
}
export const QuestionList = ({ questions, isLoading, onClickCard, refetchQuestions }: Props): JSX.Element => {
    const errorToast = useErrorToast()
    const [selectedQuestion, setSelectedQuestion] = useState<Question>(questions[1])
    const router = useRouter()
    const { mutate: updateQuestion, isLoading: isUpdateLoading } = useUpdateQuestion()
    const { mutate: deleteQuestion, isLoading: isDeleteLoading } = useDeleteQuestion()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()

    const onClickDetail = (question: Question) => {
        setSelectedQuestion(question)
        console.log(question)
    }

    const onSuccessDeleteQuestion = async () => {
        await refetchQuestions()
        onCloseDeleteForm()
    }

    const onClickUpdateQuestion = async (questionReq: QuestionReq) => {
        updateQuestion(
            {
                questionReq: questionReq,
                questionId: selectedQuestion.questionId,
            },
            {
                onSuccess: () => refetchQuestions(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
                onSettled: () => onCloseEditForm(),
            }
        )
    }

    const onClickDeleteQuestion = async () => {
        deleteQuestion(selectedQuestion.questionId, {
            onSuccess: () => onSuccessDeleteQuestion(),
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
                                onClickDeleteQuestion={onClickDeleteQuestion}
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
