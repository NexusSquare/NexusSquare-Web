import {
    HStack,
    VStack,
    Text,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    Button,
    Avatar,
    WrapItem,
    IconButton,
    Spacer,
    useDisclosure,
} from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import React from 'react'
import ChakraNextImage from '../common/chakraNextImage'
import User from '../../types/domain/account/User'
import { useRouter } from 'next/router'
import { AiFillCamera } from 'react-icons/ai'
import { EditForm } from './EditForm'
import { DefaultModal } from '../common/DefaultModal'
import UpdateUser from '../../types/api/req/account/UpdateUser'
interface Props {
    user: User
    updateProfile: (value: UpdateUser) => Promise<void>
}

export const UserInfo = ({ user, updateProfile }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const POINT_IMAGE_PATH: string = '/images/point.png'
    const DEFAULT_AVATAR_URL: string = 'https://bit.ly/broken-link'
    const { updateAt, createAt, point, mailAddress, ...updateUser } = user
    return (
        <>
            <HStack
                bgColor="subColor"
                w="full"
                border="1px"
                borderColor="gray.400"
                borderRadius="sm"
                boxShadow="md"
                justifyContent="space-evenly"
                py="0"
                position="relative"
            >
                <IconButton
                    position="absolute"
                    right="0"
                    bottom="0"
                    aria-label="通報する"
                    icon={<FiEdit />}
                    variant="outline"
                    onClick={onOpen}
                ></IconButton>
                <Box
                    w={{ base: '100px', md: '150px' }}
                    h={{ base: '100px', md: '150px' }}
                    top={{ base: '-5', md: '-10' }}
                    position="relative"
                >
                    <Avatar width="full" height="full" src={DEFAULT_AVATAR_URL} />
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
                        <Box>
                            <Text>{user.lastnameFurigana}</Text>
                            <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
                                {user.lastname}
                            </Text>
                        </Box>
                        <Box>
                            <Text>{user.firstnameFurigana}</Text>
                            <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
                                {user.firstname}
                            </Text>
                        </Box>
                    </HStack>
                    <HStack>
                        <Text>{user.department}</Text>
                        <Text>{user.subject}</Text>
                    </HStack>
                </VStack>
                <VStack height={'full'}>
                    <Text fontSize={{ base: 'xl', md: '2xl' }}>{user.grade}学年</Text>
                </VStack>
            </HStack>
            <VStack
                bgColor="subColor"
                border="2px"
                borderRadius="lg"
                borderColor="mainColor"
                py="2"
                px={{ base: '16', md: '32' }}
                spacing="1"
                boxShadow="md"
            >
                <HStack>
                    <Text textColor="mainColor" fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }} pr="2">
                        保有ポイント
                    </Text>
                    <ChakraNextImage src={POINT_IMAGE_PATH} alt={'ポイント'} width={25} height={25} pt="4" />
                </HStack>
                <HStack fontSize={{ base: '2xl', md: '6xl' }} fontWeight={{ base: 'bold', md: 'normal' }}>
                    <Text>{user.point}</Text>
                    <Text>pt</Text>
                </HStack>
                <DefaultModal isOpen={isOpen} onClose={onClose} title={'プロフィール編集'}>
                    <EditForm updateUser={updateUser} updateProfile={updateProfile} onClose={onClose} />
                </DefaultModal>
            </VStack>
        </>
    )
}
