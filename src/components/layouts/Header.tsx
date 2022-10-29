/* eslint-disable react/display-name */
import { BellIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    Button,
    Divider,
    HStack,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Spacer,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { FiEdit, FiLogIn, FiUserPlus } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import ChakraNextImage from '../common/chakraNextImage'
import { Notification } from '../../types/domain/notification/Notification'
import { LINKS } from '../../constants/links'
import { useLogOut } from '../../hooks/authentication'
import { useUser, useUserMeta } from '../../store/atom'
import { useSession } from '../../hooks/useSession'
import { USER_ID } from '../../constants/token'
import { useFetchNotifications } from '../../hooks/notification/useFetchNotification'
import { convertTimestampToString } from '../../lib/convert/convertTimestamp'
import { useUpdateNotification } from '../../hooks/notification/useUpdateNotification'
import { useErrorToast } from '../../hooks/errors/useErrorToast'
import { ERROR_MESSAGE } from '../../constants/errors'

interface Props {
    children?: ReactNode
}
interface headerFuncProps {
    url: string
    isComp: boolean
    funcName: string
}

export const Header = memo(({ children }: Props): JSX.Element => {
    console.log('render')
    const LOGO_URL: string = '/images/logo2.jpg'
    const { value: uid } = useSession(USER_ID)
    const { user } = useUser()
    const { userMeta } = useUserMeta()
    const { mutate: logOut } = useLogOut()
    const { data: notifications = [], refetch: refetchNotification } = useFetchNotifications(uid)
    const { mutate: updateNotification } = useUpdateNotification()
    const errorToast = useErrorToast()
    const router = useRouter()

    const onClickProfile = () => {
        if (!uid) return
        router.push(LINKS.PROFILE(uid))
    }

    const onClickRegister = () => {
        router.push(LINKS.REGISTER.STEP1)
    }

    const onClickLogin = () => {
        router.push(LINKS.LOGIN)
    }

    const onClickLogOut = () => {
        logOut()
    }

    const onSuccessUpdateNotification = async (questionId: string) => {
        await refetchNotification()
        router.push(LINKS.QUESTION_DETAIL(questionId))
    }

    const onClickNotification = async (notificationId: string, questionId: string) => {
        updateNotification(notificationId, {
            onSuccess: () => onSuccessUpdateNotification(questionId),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    useEffect(() => {
        console.log(user)
    }, [user])

    const HeaderFunction: React.VFC<headerFuncProps> = (props) => {
        return props.isComp ? (
            <Link href={props.url} passHref>
                <Box
                    as="a"
                    href={props.url}
                    whiteSpace="nowrap"
                    fontWeight="bold"
                    color="#FEEBC8"
                    fontSize="sm"
                    _hover={{ textDecoration: 'underline' }}
                >
                    {props.funcName}
                </Box>
            </Link>
        ) : (
            <Box
                whiteSpace="nowrap"
                onClick={() => alert('今後実装予定！お楽しみに！')}
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                fontWeight="bold"
                color="#FEEBC8"
                fontSize="sm"
            >
                {props.funcName}
            </Box>
        )
    }
    const NotificationButton = () =>
        notifications.length > 0 ? (
            <Popover>
                <PopoverTrigger>
                    <Box position="relative">
                        <IconButton
                            aria-label="通知"
                            icon={<BellIcon viewBox="0 0 24 24" boxSize="30px" color="white" />}
                            bgColor="#FF9037"
                            _hover={{ bgColor: '#FF9037' }}
                            _active={{ bgColor: '#FF9037', outline: 'none' }}
                            _focus={{ outline: 'none' }}
                        />
                        <Box
                            position="absolute"
                            bgColor="red"
                            borderRadius="50%"
                            boxSize="12px"
                            top="5px"
                            left="20px"
                            _hover={{ cursor: 'pointer' }}
                        ></Box>
                    </Box>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverBody>
                        {notifications.map((notification: Notification, index: number) => {
                            return (
                                <Box key={notification.notificationId}>
                                    <HStack
                                        py="2"
                                        px="2"
                                        _hover={{ bgColor: 'gray.100', cursor: 'pointer' }}
                                        w="full"
                                        onClick={() =>
                                            onClickNotification(notification.notificationId, notification.questionId)
                                        }
                                    >
                                        <Avatar
                                            as="button"
                                            width="32px"
                                            height="32px"
                                            src={notification.imageUrl}
                                            bg="white"
                                            borderWidth={'1px'}
                                            borderColor={'gray.200'}
                                        />
                                        <VStack spacing={0} alignItems={'start'} w="full">
                                            <HStack w="full">
                                                <Text color={'gray.400'} fontSize={'sm'} w="full" textAlign={'start'}>
                                                    {notification.nickname}
                                                    さんが回答しました。
                                                </Text>
                                            </HStack>
                                            <Text fontWeight={'bold'} fontSize={'sm'} noOfLines={1}>
                                                {notification.questionTitle}
                                            </Text>
                                        </VStack>
                                        {/* <Text color={'gray.400'} fontSize={'sm'}>
                                            {convertTimestampToString(notification.createAt)}
                                        </Text> */}
                                    </HStack>

                                    {index < notifications.length - 1 && <Divider />}
                                </Box>
                            )
                        })}
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        ) : (
            <Box>
                <IconButton
                    aria-label="通知"
                    icon={<BellIcon viewBox="0 0 25 25" boxSize="30px" color="white" />}
                    bgColor="#FF9037"
                    _hover={{ bgColor: '#FF9037' }}
                    _active={{ bgColor: '#FF9037', outline: 'none' }}
                    _focus={{ outline: 'none' }}
                />
            </Box>
        )
    const LoginOrProfile = () =>
        user ? (
            <HStack spacing="10%" w="105px">
                <NotificationButton />
                <Popover>
                    <PopoverTrigger>
                        <Avatar as="button" width="40px" height="40px" src={user.imageUrl} bg="mainColor" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight="semibold">
                            <HStack py="4" px="2" spacing="4">
                                <Avatar
                                    as="button"
                                    width="32px"
                                    height="32px"
                                    src={user.imageUrl}
                                    bg="white"
                                    borderWidth={'1px'}
                                    borderColor={'gray.200'}
                                />
                                <VStack w="full" alignItems={'left'} spacing="0">
                                    <Text>{userMeta?.name}</Text>
                                    <Text fontSize={'xs'}>{userMeta?.email}</Text>
                                </VStack>
                            </HStack>
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <HStack
                                as="button"
                                py="4"
                                px="2"
                                w="full"
                                _hover={{ bgColor: 'gray.100' }}
                                onClick={onClickProfile}
                            >
                                <FiEdit />
                                <Text>プロフィール</Text>
                            </HStack>
                            <Divider />
                            <HStack
                                as="button"
                                py="4"
                                px="2"
                                w="full"
                                _hover={{ bgColor: 'gray.100' }}
                                onClick={onClickLogOut}
                            >
                                <VscSignOut />
                                <Text>サインアウト</Text>
                            </HStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </HStack>
        ) : (
            <>
                <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {/* <PrimaryButton buttonText="新規登録" type="button" /> */}
                    <Button
                        type="button"
                        color="white"
                        bgColor="mainColor"
                        borderWidth={2}
                        borderColor="white"
                        _hover={{ bgColor: 'white', color: 'mainColor' }}
                        onClick={onClickRegister}
                        borderRadius="sm"
                    >
                        新規登録
                    </Button>
                    <HStack as="button" spacing={1} _hover={{ color: 'mainColor' }}>
                        <FiLogIn size={30} color={'white'} />
                        <Text
                            fontSize={'md'}
                            color={'white'}
                            w="full"
                            fontWeight={'bold'}
                            _hover={{ textDecoration: 'underline' }}
                            onClick={onClickLogin}
                        >
                            ログイン
                        </Text>
                    </HStack>
                </HStack>
                <HStack spacing={2} display={{ base: 'flex', md: 'none' }}>
                    <VStack
                        as="button"
                        _hover={{ color: 'mainColor' }}
                        spacing={1}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        <FiUserPlus size={20} color={'white'} />
                        <Text fontSize={'10px'} color={'white'} fontWeight={'bold'} onClick={onClickRegister}>
                            新規登録
                        </Text>
                    </VStack>
                    <VStack as="button" spacing={1} onClick={onClickLogin}>
                        <FiLogIn size={20} color={'white'} />
                        <Text fontSize={'10px'} color={'white'} fontWeight={'bold'}>
                            ログイン
                        </Text>
                    </VStack>
                </HStack>
            </>
        )

    return (
        <VStack
            as="header"
            w="100%"
            bgColor="mainColor"
            spacing="0px"
            divider={<StackDivider borderColor="gray.200" />}
            position="fixed"
            top="0"
            zIndex={'sticky'}
            borderBottom={'1px'}
            borderColor={'gray.200'}
            boxShadow="sm"
        >
            <HStack
                h="60px"
                paddingX={{ base: '10px', sm: '50px' }}
                paddingY={{ base: '0px', md: '10px' }}
                w="100%"
                bgColor="mainColor"
                justifyContent={'space-between'}
            >
                <HStack>
                    <Box
                        as="h1"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        marginX={{ base: '0px', xs: '10px' }}
                    >
                        <Link href="/" passHref>
                            <Box as="a" href="/" display="flex" flexDirection="row" alignItems="center">
                                {/* <ChakraNextImage
                                src={LOGO_URL}
                                alt="ロゴ"
                                minW="120px"
                                minH="30px"
                                maxW="180px"
                                maxH="45px"
                                width={180}
                                height={45}
                                borderColor="#FF9037"
                            ></ChakraNextImage> */}
                                <Box as="h2" color={'white'} fontWeight={'bold'} fontSize="2xl" mr={4}>
                                    NexusSquare
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                    <HStack
                        as="nav"
                        spacing="12%"
                        paddingX="0.5%"
                        aria-labelledby="jump to other functions"
                        display={{ base: 'none', md: 'flex' }}
                        paddingTop={2}
                    >
                        <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                        <HeaderFunction url="/qa/post" funcName="質問投稿" isComp={true} />
                        <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
                    </HStack>
                </HStack>
                <LoginOrProfile />
            </HStack>
            <HStack
                w="full"
                as="nav"
                spacing={4}
                paddingY={2}
                paddingX={{ base: 4, sm: '50px' }}
                aria-labelledby="jump to other functions - mini version"
                display={{ base: 'flex', md: 'none' }}
            >
                <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                <HeaderFunction url="/qa/post" funcName="質問投稿" isComp={true} />
                <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
            </HStack>
        </VStack>
    )
})
