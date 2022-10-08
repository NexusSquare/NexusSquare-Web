import { Box, HStack, VStack, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { UserInfo } from '../../profile/UserInfo'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { useFetchUser, useFetchUserMeta } from '../../../hooks/user/useFetchUser'
import { USER_ID } from '../../../constants/token'
import { useSession } from '../../../hooks/useSession'
import { Loading } from '../../common/Loading'
import { useUpdateUser } from '../../../hooks/user/useUpdateUser'
import { ERROR_MESSAGE } from '../../../constants/errors'
import { OthersInfo } from '../../profile/OthersInfo'
import { useFile } from '../../../hooks/useFile'
import { useUploadFile } from '../../../hooks/storege/useUploadFile'
import { STORAGE_URL } from '../../../constants/storage'
import { UserReq } from '../../../types/api/req/UserReq'
interface Props {
    userId: string
}
export const Page = ({ userId }: Props): JSX.Element => {
    const { value: myUserId } = useSession(USER_ID)
    const { data: user, refetch } = useFetchUser(userId)
    const { data: userMeta } = useFetchUserMeta(userId)
    const { mutate: updateUser, isLoading: updateLoading } = useUpdateUser()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { inputRef, file: image, onChangeFile: onChangeImage, onClickFile: onClickEditImage } = useFile()
    const { uploadFile: uploadFileToStorage, getFileUrl, uploading } = useUploadFile()
    const errorToast = useErrorToast()

    const onClickEditUser = useCallback(async (userReq: Partial<UserReq>) => {
        updateUser(userReq, {
            onSuccess: () => refetch(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseEditForm(),
        })
    }, [])

    const uploadImage = async (image: File) => {
        if (!myUserId) return
        // NOTE: userIdがファイル名としてstorageに保存される
        const result = await uploadFileToStorage(image, STORAGE_URL.USERS(myUserId))
        if (!result) return errorToast(ERROR_MESSAGE.SERVER)

        // NOTE DBの画像パスを更新
        const imageUrl = await getFileUrl(STORAGE_URL.USERS(myUserId))
        const imageReq: Partial<UserReq> = { imageUrl: imageUrl }
        updateUser(imageReq, {
            onSuccess: () => refetch(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    //　NOTE 画像がセットされるとstorageに保存される。
    useEffect(() => {
        if (!image) return
        uploadImage(image)
    }, [image])

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
                    inputRef={inputRef}
                    onChangeImage={onChangeImage}
                    onClickEditImage={onClickEditImage}
                    avatarUploading={uploading}
                />
            ) : (
                <OthersInfo user={user} />
            )}
            {/* <UserHistory historyList={histories} /> */}
        </VStack>
    )
}
