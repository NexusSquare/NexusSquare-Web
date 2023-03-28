import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../entities/qa/Answer'

import { useUser } from '../../../../store/atom'
import { useFetchAnswersByQuestionId } from '../../../../hooks/answer/useFethcAnswer'
import { BackButton } from '../../../common/buttons/BackButton'
import { AnswerList } from '../../../organisms/qa/AnswerList'
import { QuestionDetail } from './_QuestionDetail'
import { useEffect, useState } from 'react'
import { useBestAnswer } from '../../../../hooks/question/useUpdateQuestion'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { LeftBar } from '../../../layouts/LeftBar'
import { ContentsLayout } from '../../../layouts/ContentsLayout'

interface Props {
    questionId: string
}

export const DetailPage = ({ questionId }: Props): JSX.Element => {
    const { user } = useUser()
    const errorToast = useErrorToast()
    const [displayAnswers, setDisplayAnswers] = useState<Answer[]>([])
    const { data: question, isLoading, refetch: refetchQuestion } = useFetchQuestion(questionId)
    const { data: answers = [], isLoading: isFetchAnswersLoading } = useFetchAnswersByQuestionId(questionId)
    const { mutate: declareBestAnswer, isLoading: isDeclareLoading, cacheClearQuestion } = useBestAnswer()
    const {
        isOpen: isOpenBestAnswerForm,
        onOpen: onOpenBestAnswerForm,
        onClose: onCloseBestAnswerForm,
    } = useDisclosure()

    // NOTE:既に投稿したか
    const isPosted: boolean = answers.some((answer) => answer.userId === user?.userId)
    // NOTE:自分の投稿かどうか
    const isMine = user?.userId === question?.userId

    const bestAnswer = answers.find((ans: Answer) => {
        return ans.answerId === question?.bestAnswerId
    })
    const hasBestAnswer = answers.some((ans: Answer) => {
        return ans.answerId === question?.bestAnswerId
    })

    const onSuccessBestAnswer = async (userId: string) => {
        cacheClearQuestion(userId)
        await refetchQuestion()
        onCloseBestAnswerForm()
    }

    const onClickBestAnswer = async (answerId: string) => {
        declareBestAnswer(
            { answerId, questionId },
            {
                onSuccess: () => onSuccessBestAnswer(user?.userId!),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
            }
        )
    }

    const sortAnswersByBestAnswer = (bestAnswer: Answer, answers: Answer[]): Answer[] => {
        const filletedAnswer = answers.filter((ans: Answer) => {
            ans.answerId !== bestAnswer?.answerId
        })
        return [bestAnswer, ...filletedAnswer]
    }

    // NOTE:ベストアンサーが先頭に来るようにソート
    useEffect(() => {
        if (!bestAnswer) {
            // NOTE:ベストアンサーが存在しない時そのまま表示
            setDisplayAnswers(answers)
        } else {
            const sortedAnswers: Answer[] = sortAnswersByBestAnswer(bestAnswer, answers)
            setDisplayAnswers(sortedAnswers)
        }
    }, [answers, bestAnswer])

    return (
        <ContentsLayout Left={<LeftBar />}>
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
                    answers={displayAnswers}
                    isFetchLoading={isFetchAnswersLoading}
                    questionId={questionId}
                    isMine={isMine}
                    isOpenBestAnswerForm={isOpenBestAnswerForm}
                    onOpenBestAnswerForm={onOpenBestAnswerForm}
                    onCloseBestAnswerForm={onCloseBestAnswerForm}
                    onClickBestAnswer={onClickBestAnswer}
                    isDeclareLoading={isDeclareLoading}
                    hasBestAnswer={hasBestAnswer}
                />
            </VStack>
        </ContentsLayout>
    )
}
