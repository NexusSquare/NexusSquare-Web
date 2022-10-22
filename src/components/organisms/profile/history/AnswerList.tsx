import { VStack } from '@chakra-ui/react'
import React from 'react'
import { Answer } from '../../../../types/domain/qa/Answer'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import { AnswerCard } from '../../../molecules/profile/AnswerCars'

interface Props {
    answers: Answer[]
    isLoading: boolean
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onClickCard: (value: string) => void
}
export const AnswerList = ({ answers, isLoading, onOpenEditForm, onOpenDeleteForm, onClickCard }: Props) => {
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
                            {answers.map((answer: Answer, index: number) => {
                                return (
                                    <AnswerCard
                                        answer={answer}
                                        key={answer.answerId}
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
