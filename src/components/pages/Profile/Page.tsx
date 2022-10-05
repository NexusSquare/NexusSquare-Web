import { Box, Button, HStack, Spinner, VStack, Text, useToast, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { UserHistory } from '../../profile/UserHistory'
import { UserInfo } from '../../profile/UserInfo'
import History from '../../../types/domain/account/History'
import User from '../../../types/domain/account/User'
import UpdateUser from '../../../types/api/req/account/UpdateUser'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { useFetchUser, useFetchUserMeta } from '../../../hooks/user/useFetchUser'
import { USER_ID } from '../../../constants/token'
import { useSession } from '../../../hooks/useSession'
import { Loading } from '../../common/Loading'
import { useUpdateUser } from '../../../hooks/user/useUpdateUser'
import { ERROR_MESSAGE } from '../../../constants/errors'
import { UserReq } from '../../../types/api/req/userReq'
import { OthersInfo } from '../../profile/OthersInfo'

interface Props {
    histories: History[]
    userId: string
}
export const Page = ({ histories, userId }: Props): JSX.Element => {
    const { value: myUserId } = useSession(USER_ID)
    const { data: user, refetch } = useFetchUser(userId)
    const { data: userMeta } = useFetchUserMeta(userId)
    const { mutate: updateUser, isLoading: updateLoading } = useUpdateUser()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const [profile, setProfile] = useState<User>()
    const [historyList, setHistoryList] = useState<History[]>(histories)
    const errorToast = useErrorToast()

    const onClickEditUser = useCallback(async (userReq: Partial<UserReq>) => {
        updateUser(userReq, {
            onSuccess: () => refetch(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseEditForm(),
        })
    }, [])

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
                <UserInfo
                    user={user}
                    userMeta={userMeta}
                    onClickEditUser={onClickEditUser}
                    isLoading={updateLoading}
                    isOpenEditForm={isOpenEditForm}
                    onOpenEditForm={onOpenEditForm}
                    onCloseEditForm={onCloseEditForm}
                />
            ) : (
                <OthersInfo user={user} />
            )}

            <UserHistory historyList={histories} />
        </VStack>
    )
}
