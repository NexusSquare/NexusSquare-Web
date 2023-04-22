import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { UserInfo } from '../../organisms/profile/user/UserInfo'
import { useFetchUser, useFetchUserMeta } from '../../../hooks/user/useFetchUser'
import { Loading } from '../../ui/common/Loading'
import { OthersInfo } from '../../organisms/profile/user/OthersInfo'
import { UserHistory } from './_UserHistory'
import { useFetchQuestionsByUserId } from '../../../hooks/question/useFetchQuestion'
import { useFetchAnswersByUserId } from '../../../hooks/answer/useFethcAnswer'
import { BackButton } from '../../ui/common/Button/BackButton'
import { useUser } from '../../../store/atom'
import { ContentsLayout } from '../../layouts/ContentsLayout'
import { LeftBar } from '../../layouts/LeftBar'
import { NoItem } from '../../ui/common/NoItem'
import { useAuth } from '../../../hooks/authentication'
interface Props {
    userId: string
    tab?: string
}
// TODO　 コンポーネント分割（責務の分離）
export const ProfilePage = ({ userId, tab }: Props): JSX.Element => {
    const { data: currentUser } = useAuth()
    const isMine = userId === currentUser?.uid

    const { data: profile, refetch: refetchUser, isError } = useFetchUser(userId)
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

    const isFetchLoading: boolean = isFetchQuestionsLoading || isFetchAnswersLoading

    if (isError) return <NoItem title="ユーザー" />
    if (!profile) return <Loading />
    return (
        <ContentsLayout Left={<LeftBar />}>
            <VStack w="full" pb="4" spacing={0}>
                <BackButton />
                {isMine ? (
                    <UserInfo user={profile} userMeta={userMeta} refetchUser={refetchUser} />
                ) : (
                    <OthersInfo user={profile} />
                )}
                <UserHistory
                    isMine={isMine}
                    userId={userId}
                    answers={answers}
                    questions={questions}
                    isFetchLoading={isFetchLoading}
                    refetchQuestions={refetchQuestions}
                    refetchAnswers={refetchAnswers}
                    defaultTab={tab}
                />
            </VStack>
        </ContentsLayout>
    )
}
