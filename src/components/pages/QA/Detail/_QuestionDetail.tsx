import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { usePostAnswer } from '../../../../hooks/answer/usePostAnswer'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { useDeleteQuestion } from '../../../../hooks/question/useDeleteQuestion'
import { useUpdateQuestion } from '../../../../hooks/question/useUpdateQuestion'
import { Refetch } from '../../../../hooks/react-query/type'
import { useReport } from '../../../../hooks/report/useReport'
import { AnswerReq, QuestionReq, ReportReq } from '../../../../api/req'
import { Question } from '../../../../entities/qa'
import { User } from '../../../../entities/user'
import { QASkeleton } from '../../../common/QASkeleton'
import { PostFormModal } from '../../../molecules/qa/answer/PostFormModal'
import { DeleteFormModal } from '../../../molecules/qa/DeleteFormModal'
import { EditFormModal } from '../../../molecules/qa/question/EditFormModal'
import { QAPerfectCard } from '../../../molecules/qa/question/QAPerfectCard'
import { ReportFormModal } from '../../../molecules/qa/ReportFromModal'
import { useUser } from '../../../../store/atom'
import { Answer } from '../../../../entities/qa/Answer'

interface Props {
    questionId: string
    isLoading: boolean
    question?: Question
    refetch: Refetch<Question>
    refetchAnswers: Refetch<Answer[]>
    postUser?: User
    isPosted: boolean
    isMine: boolean
}

export const QuestionDetail = ({
    questionId,
    isLoading,
    question,
    refetch,
    postUser,
    isPosted,
    isMine,
    refetchAnswers,
}: Props) => {
    const errorToast = useErrorToast()
    const router = useRouter()
    const { user } = useUser()
    const { mutate: updateQuestion, isLoading: isUpdateLoading } = useUpdateQuestion()
    const { mutate: deleteQuestion, isLoading: isDeleteLoading, cacheClearQuestion } = useDeleteQuestion()
    const { mutate: postAnswer, isLoading: isPostLoading, cacheClearAnswer } = usePostAnswer()
    const { mutate: report, isLoading: isReportLoading } = useReport()

    const { isOpen: isOpenPostForm, onOpen: onOpenPostForm, onClose: onClosePostForm } = useDisclosure()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { isOpen: isOpenDeleteForm, onOpen: onOpenDeleteForm, onClose: onCloseDeleteForm } = useDisclosure()
    const { isOpen: isOpenReportForm, onOpen: onOpenReportForm, onClose: onCloseReportForm } = useDisclosure()

    const onClickUpdateQuestion = async (questionReq: QuestionReq) => {
        updateQuestion(
            {
                questionReq: questionReq,
                questionId: questionId,
            },
            {
                onSuccess: () => refetch(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
                onSettled: () => onCloseEditForm(),
            }
        )
    }

    const onClickDeleteQuestion = async () => {
        deleteQuestion(questionId, {
            onSuccess: onSuccessDeleteQuestion,
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseDeleteForm(),
        })
    }

    const onSuccessDeleteQuestion = async () => {
        if (!user?.userId) return
        await cacheClearQuestion(user.userId)
        router.push(PAGE_LINKS.QA.URL)
    }

    const onClickReportFrom = () => {
        onOpenReportForm()
    }

    const onClickReport = async (reportReq: ReportReq) => {
        report(reportReq, {
            onSuccess: () => router.push(PAGE_LINKS.QA.URL),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseReportForm(),
        })
    }

    const onSuccessPostAnswer = () => {
        if (!postUser) return
        cacheClearAnswer(postUser.userId, questionId)
    }

    const onClickPostAnswer = async (answerReq: AnswerReq) => {
        if (!postUser) return
        postAnswer(
            { answerReq, postUser },
            {
                onSuccess: () => refetchAnswers(),
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
                onSettled: () => onClosePostForm(),
            }
        )
    }
    return (
        <>
            {isLoading || !question ? (
                <QASkeleton />
            ) : (
                <>
                    <QAPerfectCard
                        question={question}
                        onOpenEditForm={onOpenEditForm}
                        onOpenDeleteForm={onOpenDeleteForm}
                        onOpenReportForm={onClickReportFrom}
                        onOpenPostForm={onOpenPostForm}
                        isPosted={isPosted}
                        isMine={isMine}
                    />
                    <EditFormModal
                        onClose={onCloseEditForm}
                        isOpen={isOpenEditForm}
                        question={question}
                        onClickUpdateQuestion={onClickUpdateQuestion}
                        isUpdateLoading={isUpdateLoading}
                    />
                    <PostFormModal
                        onClose={onClosePostForm}
                        isOpen={isOpenPostForm}
                        question={question}
                        isPostLoading={isPostLoading}
                        postAnswer={onClickPostAnswer}
                    />
                </>
            )}
            <DeleteFormModal
                onClose={onCloseDeleteForm}
                isOpen={isOpenDeleteForm}
                onClickDelete={onClickDeleteQuestion}
                isDeleteLoading={isDeleteLoading}
            />
            <ReportFormModal
                onClose={onCloseReportForm}
                isOpen={isOpenReportForm}
                isReportLoading={isReportLoading}
                onClickReport={onClickReport}
                type="question"
                postId={questionId}
            />
        </>
    )
}
