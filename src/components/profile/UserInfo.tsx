/* eslint-disable react/display-name */
import {
    HStack,
    VStack,
    Text,
    Box,
    Button,
    Avatar,
    WrapItem,
    IconButton,
    Spacer,
    useDisclosure,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import React, { memo } from 'react'
import ChakraNextImage from '../common/chakraNextImage'
import { useRouter } from 'next/router'
import { AiFillCamera } from 'react-icons/ai'
import { EditForm } from './EditForm'
import { DefaultModal } from '../common/DefaultModal'
import UpdateUser from '../../types/api/req/account/UpdateUser'
import { FaCoins } from 'react-icons/fa'
import { User, UserMeta } from '../../types/domain/user'
import { UserReq } from '../../types/api/req/userReq'

interface Props {
    user: User
    userMeta?: UserMeta
    onClickEditUser: (value: Partial<UserReq>) => Promise<void>
    isLoading: boolean
    isOpenEditForm: boolean
    onOpenEditForm: () => void
    onCloseEditForm: () => void
}

export const UserInfo = memo(
    ({ user, onClickEditUser, isLoading, isOpenEditForm, onOpenEditForm, onCloseEditForm }: Props) => {
        return (
            <>
                <HStack
                    w="full"
                    border="1px"
                    borderColor="gray.400"
                    borderRadius="sm"
                    boxShadow="md"
                    justifyContent="space-evenly"
                    py="0"
                    position="relative"
                    mx="4"
                >
                    <IconButton
                        position="absolute"
                        right="0"
                        bottom="0"
                        aria-label="編集する"
                        icon={<FiEdit />}
                        variant="outline"
                        onClick={onOpenEditForm}
                        size="sm"
                        border={'none'}
                    ></IconButton>
                    <Box
                        w={{ base: '100px', md: '150px' }}
                        h={{ base: '100px', md: '150px' }}
                        top={{ base: '-5', md: '-10' }}
                        position="relative"
                    >
                        <Avatar width="full" height="full" src={user.imageUrl} />
                        <Box
                            boxSize={{ base: '8', md: '10' }}
                            position="absolute"
                            bottom="0"
                            right="0"
                            opacity={'0.6'}
                            as="button"
                        >
                            <AiFillCamera size={'full'} />
                        </Box>
                    </Box>
                    <VStack>
                        <HStack>
                            <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
                                {user.nickname}
                            </Text>
                        </HStack>
                        {user.isDepartmentAnonymous ? (
                            <Text>学部学科：非表示</Text>
                        ) : (
                            <HStack>
                                <Text>{user.department}</Text>
                                <Text>{user.subject}</Text>
                            </HStack>
                        )}
                    </VStack>
                    <VStack height={'full'}>
                        <Text fontSize={{ base: 'lg', md: 'xl' }}>{user.grade}</Text>
                    </VStack>
                </HStack>
                <VStack
                    border="1px"
                    borderRadius="lg"
                    borderColor="gray.400"
                    py="2"
                    px={{ base: '16', md: '32' }}
                    spacing="1"
                    boxShadow="md"
                >
                    <HStack>
                        <FaCoins color={'#FF9037'} size={24} />
                        <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }} pr="2" color={'mainColor'}>
                            ポイント
                        </Text>
                    </HStack>
                    <HStack fontSize={{ base: '2xl', md: '4xl' }}>
                        <Text>{user.point}</Text>
                        <Text>pt</Text>
                    </HStack>
                    <DefaultModal isOpen={isOpenEditForm} onClose={onCloseEditForm} title={'プロフィール編集'}>
                        <EditForm updateProfile={onClickEditUser} user={user} isLoading={isLoading} />
                    </DefaultModal>
                </VStack>
            </>
        )
    }
)
