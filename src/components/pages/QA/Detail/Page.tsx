import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../entities/qa/Answer'

import { useUser } from '../../../../store/atom'
import { useFetchAnswersByQuestionId } from '../../../../hooks/answer/useFethcAnswer'
import { BackButton } from '../../../ui/common/Button/BackButton'
import { AnswerList } from './_AnswerList'
import { QuestionDetail } from './_QuestionDetail'
import { useBestAnswer } from '../../../../hooks/question/useUpdateQuestion'
import { useErrorToast } from '../../../../hooks/toast/useErrorToast'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { LeftBar } from '../../../layouts/LeftBar'
import { ContentsLayout } from '../../../layouts/ContentsLayout'
import { SponserBanner } from '../../../ui/features/Suponser/Banner'
import { advertisement } from '../../../../entities/Advertisement'
import { NoItem } from '../../../ui/common/NoItem'

interface Props {
    questionId: string
}

const sponser = advertisement.getOne()

export const DetailPage = ({ questionId }: Props): JSX.Element => {
    const { user } = useUser()
    const errorToast = useErrorToast()

    const { data: question, isLoading, refetch: refetchQuestion, isError } = useFetchQuestion(questionId)
    const {
        data: answers = [],
        isLoading: isFetchAnswersLoading,
        refetch: refetchAnswers,
    } = useFetchAnswersByQuestionId(questionId)
    const { mutate: declareBestAnswer, isLoading: isDeclareLoading, cacheClearQuestion } = useBestAnswer()
    const {
        isOpen: isOpenBestAnswerForm,
        onOpen: onOpenBestAnswerForm,
        onClose: onCloseBestAnswerForm,
    } = useDisclosure()
    const questionCount = answers.length

    const bestAnswer: Answer | undefined = answers.find((answer) => answer.answerId === question?.bestAnswerId)
    const otherAnswers: Answer[] = answers.filter((answer) => answer.answerId !== question?.bestAnswerId)
    const sortedAnswers = bestAnswer ? [bestAnswer, ...otherAnswers] : answers

    // NOTE:既に投稿したか
    const isPosted: boolean = answers.some((answer) => answer.userId === user?.userId)
    // NOTE:自分の投稿かどうか
    const isMine = user?.userId === question?.userId

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

    if (isError) return <NoItem title="質問" />

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
                    refetchAnswers={refetchAnswers}
                    questionCount={questionCount}
                />
                <HStack py="6">
                    <SponserBanner sponser={sponser} />
                </HStack>
                <AnswerList
                    answers={sortedAnswers}
                    isFetchLoading={isFetchAnswersLoading}
                    questionId={questionId}
                    isMine={isMine}
                    isOpenBestAnswerForm={isOpenBestAnswerForm}
                    onOpenBestAnswerForm={onOpenBestAnswerForm}
                    onCloseBestAnswerForm={onCloseBestAnswerForm}
                    onClickBestAnswer={onClickBestAnswer}
                    isDeclareLoading={isDeclareLoading}
                    bestAnswerId={question?.bestAnswerId}
                    refetchAnswers={refetchAnswers}
                />
            </VStack>
        </ContentsLayout>
    )
}
