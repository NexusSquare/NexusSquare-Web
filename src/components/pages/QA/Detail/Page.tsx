import { Box, Button, Divider, HStack, Image, Text, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import { QAPerfectCard } from '../../../molecules/qa/question/QAPerfectCard'
import AnswerCard from '../../../molecules/qa/answer/AnswerCard'
import { PostFormModal } from '../../../molecules/qa/answer/PostFormModal'
import { EditFormModal } from '../../../molecules/qa/question/EditFormModal'
import { useFetchQuestion } from '../../../../hooks/question/useFetchQuestion'
import { Answer } from '../../../../types/domain/qa/Answer'
import { QASkeleton } from '../../../common/QASkeleton'
import { AnswerReq, QuestionReq } from '../../../../types/api/req'
import { useUpdateQuestion } from '../../../../hooks/question/useUpdateQuestion'
import { useDeleteQuestion } from '../../../../hooks/question/useDeleteQuestion'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { DeleteFormModal } from '../../../molecules/qa/question/DeleteFormModal'
import { LINKS } from '../../../../constants/links'
import { ReportFormModal } from '../../../molecules/qa/question/ReportFromModal'
import { useReport } from '../../../../hooks/report/useReport'
import { ReportReq } from '../../../../types/api/req/ReportReq'
import { usePostAnswer } from '../../../../hooks/answer/usePostAnswer'
import { useUser } from '../../../../store/atom'
import { useFetchAnswersByQuestionId } from '../../../../hooks/answer/useFethcAnswer'
import { NoCards } from '../../../common/NoCards'
import { BackButton } from '../../../common/BackButton'
import { AnswerList } from '../../../organisms/qa/AnswerList'
import { QuestionDetail } from '../../../organisms/qa/QuestionDetail'

interface Props {
    questionId: string
}

export const Page = ({ questionId }: Props): JSX.Element => {
    const { user: postUser } = useUser()
    const { data: question, isLoading, refetch: refetchQuestion } = useFetchQuestion(questionId)
    const { data: answers = [], isLoading: isFetchAnswersLoading } = useFetchAnswersByQuestionId(questionId)

    return (
        <VStack w="full" spacing={2}>
            <BackButton />
            <QuestionDetail
                questionId={questionId}
                isLoading={isLoading}
                postUser={postUser}
                refetch={refetchQuestion}
                question={question}
            />
            <HStack py="12">
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
                <Box w="180px" h="180px" bgColor="gray.200">
                    広告枠
                </Box>
            </HStack>
            <AnswerList answers={answers} isFetchLoading={isFetchAnswersLoading} questionId={questionId} />
        </VStack>
    )
}
