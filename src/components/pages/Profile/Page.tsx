import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { UserInfo } from '../../organisms/profile/user/UserInfo'
import { useFetchUser, useFetchUserMeta } from '../../../hooks/user/useFetchUser'
import { Loading } from '../../common/Loading'
import { OthersInfo } from '../../organisms/profile/user/OthersInfo'
import { UserHistory } from '../../organisms/profile/history/UserHistory'
import { useFetchQuestionsByUserId } from '../../../hooks/question/useFetchQuestion'
import { useFetchAnswersByUserId } from '../../../hooks/answer/useFethcAnswer'
import { BackButton } from '../../common/BackButton'
import { useUser } from '../../../store/atom'
interface Props {
    userId: string
}
// TODO　 コンポーネント分割（責務の分離）
export const Page = ({ userId }: Props): JSX.Element => {
    const { user: currentUser } = useUser()
    const myUserId = currentUser?.userId

    const { data: user, refetch: refetchUser } = useFetchUser(userId)
    const { data: userMeta } = useFetchUserMeta(userId)
    const {
        data: questions = [],
        refetch: refetchQuestions,
        isLoading: isFetchQuestionsLoading,
    } = useFetchQuestionsByUserId(userId)
    const {
        data: answers = [],
        refetch: refetchAnswers,
        isLoading: isFetchAnswersLoading,
    } = useFetchAnswersByUserId(userId)
    const refetchUserAndQuestions = async () => {
        refetchQuestions()
        await refetchUser()
    }
    const refetchUserAndAnswers = async () => {
        await refetchAnswers()
        refetchUser()
    }
    const isFetchLoading: boolean = isFetchQuestionsLoading || isFetchAnswersLoading

    if (!user) return <Loading />
    return (
        <VStack w="full" pb="4">
            <BackButton />
            {userId === myUserId ? (
                <UserInfo user={user} userMeta={userMeta} refetchUser={refetchUser} />
            ) : (
                <OthersInfo user={user} />
            )}
            <UserHistory
                userId={userId}
                answers={answers}
                questions={questions}
                isFetchLoading={isFetchLoading}
                refetchQuestions={refetchUserAndQuestions}
                refetchAnswers={refetchUserAndAnswers}
            />
        </VStack>
    )
}
