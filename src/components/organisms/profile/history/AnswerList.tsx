import { useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { Answer } from '../../../../types/domain/qa/Answer'
import { NoCards } from '../../../common/NoCards'
import { QASkeleton } from '../../../common/QASkeleton'
import { AnswerCard } from '../../../molecules/profile/AnswerCars'

interface Props {
    answers: Answer[]
    isLoading: boolean
    onClickCard: (value: string) => void
}
export const AnswerList = ({ answers, isLoading, onClickCard }: Props) => {
    const {
        isOpen: isOpenEditAnswerForm,
        onOpen: onOpenEditAnswerForm,
        onClose: onCloseEditAnswerForm,
    } = useDisclosure()
    const {
        isOpen: isOpenDeleteAnswerForm,
        onOpen: onOpenDeleteAnswerForm,
        onClose: onCloseDeleteAnswerForm,
    } = useDisclosure()
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
                                        onOpenEditForm={onOpenEditAnswerForm}
                                        onOpenDeleteForm={onOpenDeleteAnswerForm}
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
