/* eslint-disable react/display-name */
import {
    HStack,
    VStack,
    Text,
    Box,
    Avatar,
    IconButton,
    Input,
    Spinner,
    useDisclosure,
    Spacer,
    Divider,
    Tooltip,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverBody,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import React, { memo, RefObject, useCallback, useEffect } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { EditForm } from '../../../molecules/profile/EditForm'
import { DefaultModal } from '../../../common/DefaultModal'
import { FaCoins } from 'react-icons/fa'
import { User, UserMeta } from '../../../../entities/user'
import { UserReq } from '../../../../api/req/UserReq'
import { useUpdateUser } from '../../../../hooks/user/useUpdateUser'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { STORAGE_URL } from '../../../../constants/storage'
import { useUploadFile } from '../../../../hooks/storege/useUploadFile'
import { useFile } from '../../../../hooks/useFile'
import { Refetch } from '../../../../hooks/react-query/type'
import { ProfileItem } from './_ProfileItem'
import { BsQuestionCircle } from 'react-icons/bs'
import { QuestionPopover } from '../../../common/Popover'

interface Props {
    user: User
    userMeta?: UserMeta
    refetchUser: Refetch<User | undefined>
}

export const UserInfo = memo(({ user, userMeta, refetchUser }: Props) => {
    const { mutate: updateUser, isLoading: updateLoading } = useUpdateUser()
    const { isOpen: isOpenEditForm, onOpen: onOpenEditForm, onClose: onCloseEditForm } = useDisclosure()
    const { inputRef, file: image, onChangeFile: onChangeImage, onClickFile: onClickEditImage } = useFile()
    const { uploadFile: uploadFileToStorage, getFileUrl, uploading: avatarUploading } = useUploadFile()
    const errorToast = useErrorToast()

    const onClickEditUser = useCallback(async (userReq: Partial<UserReq>) => {
        updateUser(userReq, {
            onSuccess: () => refetchUser(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
            onSettled: () => onCloseEditForm(),
        })
    }, [])

    const uploadImage = async (image: File) => {
        if (!user.userId) return
        // NOTE: userIdがファイル名としてstorageに保存される
        const result = await uploadFileToStorage(image, STORAGE_URL.USERS(user.userId))
        if (!result) return errorToast(ERROR_MESSAGE.SERVER)

        // NOTE DBの画像パスを更新
        const imageUrl = await getFileUrl(STORAGE_URL.USERS(user.userId))
        const imageReq: Partial<UserReq> = { imageUrl: imageUrl }
        updateUser(imageReq, {
            onSuccess: () => refetchUser(),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    const imageLoading = avatarUploading || updateLoading

    //　NOTE 画像がセットされるとstorageに保存される。
    useEffect(() => {
        if (!image) return
        uploadImage(image)
    }, [image])

    return (
        <>
            <VStack
                w="full"
                border="1px"
                borderColor="gray.300"
                borderRadius="sm"
                justifyContent="space-evenly"
                pb="2"
                position="relative"
                mx="4"
            >
                <Box
                    position="relative"
                    w={{ base: '80px', md: '100px' }}
                    h={{ base: '80px', md: '100px' }}
                    top={-10}
                    mb={-10}
                >
                    <Avatar
                        width="full"
                        height="full"
                        src={user.imageUrl}
                        bg="white"
                        borderColor={'gray.200'}
                        borderWidth="1px"
                    />
                    <Box
                        boxSize={{ base: '8', md: '10' }}
                        position="absolute"
                        bottom="0"
                        right="0"
                        opacity={'0.6'}
                        as="button"
                        onClick={onClickEditImage}
                    >
                        {imageLoading ? <Spinner /> : <AiFillCamera size={'full'} />}
                    </Box>
                    <Input type="file" ref={inputRef} accept="image/*" hidden onChange={onChangeImage} multiple />
                </Box>
                <VStack w="full" spacing={1}>
                    <Text fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }}>
                        {user.nickname}
                    </Text>
                    <ProfileItem label={'学部'} value={user.department} isAnonymous={user.isDepartmentAnonymous} />
                    <ProfileItem label={'学科'} value={user.subject} isAnonymous={user.isDepartmentAnonymous} />
                    <ProfileItem label={'学年'} value={user.grade} />
                    <HStack>
                        <Text fontSize={{ base: 'md', md: 'xl' }}>
                            現在のポイント：
                            <Box color="red.400" fontWeight={'bold'} as="span">
                                {user.point}pt
                            </Box>
                        </Text>
                        <QuestionPopover
                            description={
                                '質問や回答をするとポイントが付与されます。今後、ポイントが一定数貯まると景品に応募できるようになるかも...？'
                            }
                        />
                    </HStack>
                </VStack>
                <IconButton
                    position="absolute"
                    right="0"
                    bottom="0"
                    aria-label="編集する"
                    icon={<FiEdit />}
                    variant="outline"
                    onClick={onOpenEditForm}
                    size="md"
                    border={'none'}
                ></IconButton>
            </VStack>

            <DefaultModal isOpen={isOpenEditForm} onClose={onCloseEditForm} title={'プロフィール編集'}>
                <EditForm updateProfile={onClickEditUser} user={user} isLoading={updateLoading} />
            </DefaultModal>
        </>
    )
})
