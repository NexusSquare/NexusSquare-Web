import { Box, HStack, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { UserInfo } from '../../organisms/profile/user/UserInfo'
import { useFetchUser, useFetchUserMeta } from '../../../hooks/user/useFetchUser'
import { USER_ID } from '../../../constants/token'
import { useSession } from '../../../hooks/useSession'
import { Loading } from '../../common/Loading'
import { OthersInfo } from '../../organisms/profile/user/OthersInfo'
import { UserHistory } from '../../organisms/profile/history/UserHistory'
import { useFetchQuestionsByUserId } from '../../../hooks/question/useFetchQuestion'
import { useFetchAnswersByUserId } from '../../../hooks/answer/useFethcAnswer'
interface Props {
    userId: string
}
// TODO　 コンポーネント分割（責務の分離）
export const Page = ({ userId }: Props): JSX.Element => {
    const { value: myUserId } = useSession(USER_ID)
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
        refetchUser()
        refetchQuestions()
    }
    const isFetchLoading: boolean = isFetchQuestionsLoading || isFetchAnswersLoading

    if (!user) return <Loading />
    return (
        <VStack w="full" pb="4" spacing={8}>
            <HStack w={'full'} p="4" mb="8">
                <Link href="/qa" passHref>
                    <Text as="a" fontSize="lg" fontWeight="bold" cursor="pointer">
                        <Box as="span" color="mainColor">
                            ◀︎
                        </Box>
                        ホーム
                    </Text>
                </Link>
            </HStack>
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
            />
        </VStack>
    )
}
