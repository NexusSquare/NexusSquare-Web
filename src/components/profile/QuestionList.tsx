import { VStack } from '@chakra-ui/react'
import React from 'react'
import { Question } from '../../types/domain/qa'
import { NoCards } from '../common/NoCards'
import { QASkeleton } from '../common/QASkeleton'
import { QuestionCard } from './QuestionCard'

interface Props {
    questions: Question[]
    isLoading: boolean
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onClickCard: (value: string) => void
}
export const QuestionList = ({ questions, isLoading, onOpenEditForm, onOpenDeleteForm, onClickCard }: Props) => {
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
                                    />
                                )
                            })}
                        </>
                    ) : (
                        <NoCards text="回答はまだありません。" />
                    )}
                </VStack>
            )}
        </>
    )
}
