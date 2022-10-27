import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import { QAPerfectCard } from '../../../molecules/qa/question/QAPerfectCard'
import AnswerCard from '../../../molecules/qa/answer/AnswerCard'
import { PostFormModal } from '../../../molecules/qa/answer/PostFormModal'
import { EditFormModal } from '../../../molecules/qa/question/EditFormModal'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../types/domain/qa/Answer'

import { useUser } from '../../../../store/atom'
import { useFetchAnswersByQuestionId } from '../../../../hooks/answer/useFethcAnswer'
import { NoCards } from '../../../common/NoCards'
import { BackButton } from '../../../common/BackButton'
import { AnswerList } from '../../../organisms/qa/AnswerList'
import { QuestionDetail } from '../../../organisms/qa/QuestionDetail'
import { useState } from 'react'

interface Props {
    questionId: string
}

export const Page = ({ questionId }: Props): JSX.Element => {
    const { user } = useUser()
    const { data: question, isLoading, refetch: refetchQuestion } = useFetchQuestion(questionId)
    const { data: answers = [], isLoading: isFetchAnswersLoading } = useFetchAnswersByQuestionId(questionId)
    const isPosted: boolean = answers.some((answer) => answer.userId === user?.userId)
    const isMine = user?.userId === question?.userId
    return (
        <VStack w="full" spacing={2}>
            <BackButton />
            <QuestionDetail
                questionId={questionId}
                isLoading={isLoading}
                postUser={user}
                refetch={refetchQuestion}
                question={question}
                isPosted={isPosted}
                isMine={isMine}
            />
            <HStack py="12">
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
            </HStack>
            <AnswerList
                answers={answers}
                isFetchLoading={isFetchAnswersLoading}
                questionId={questionId}
                isMine={isMine}
            />
        </VStack>
    )
}
