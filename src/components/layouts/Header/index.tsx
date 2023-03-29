/* eslint-disable react/display-name */
import { BellIcon } from '@chakra-ui/icons'
import { Avatar, Box, HStack, StackDivider, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, memo, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { FiEdit, FiLogIn, FiUserPlus } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import ChakraNextImage from '../../common/chakraNextImage'
import { Notification } from '../../../entities/notification/Notification'
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { useLogOut } from '../../../hooks/authentication'
import { useUser, useUserMeta } from '../../../store/atom'
import { useFetchNotifications } from '../../../hooks/notification/useFetchNotification'
import { convertDateToString } from '../../../lib/convert/convertTimestamp'
import { useUpdateNotification } from '../../../hooks/notification/useUpdateNotification'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { ERROR_MESSAGE } from '../../../constants/errors'
import { createNotificationMessage } from '../../../constants/notification'
import { HEADER_HEIGHT } from '../constants'
import { NotificationButton } from './notifications/_NotificationButton'
import { AvatarPopover } from './_AvatarPopover'
import { RegisterAndLogin } from './_RegisterAndLogin'
import { NavigationLink } from './_NavigationLink'
import { pagesPath } from '../../../lib/$path'

interface Props {
    children?: ReactNode
}

export const Header = memo(({ children }: Props): JSX.Element => {
    const LOGO_URL: string = '/images/logo.jpg'
    const { user } = useUser()
    const { userMeta } = useUserMeta()
    const { mutate: logOut } = useLogOut()
    const { data: notifications = [], refetch: refetchNotification } = useFetchNotifications(user?.userId)
    const { mutate: updateNotification } = useUpdateNotification()
    const errorToast = useErrorToast()
    const router = useRouter()

    const onClickProfile = () => {
        if (!user?.userId) return
        router.push(pagesPath.profile._id(user.userId).$url())
    }

    const onClickRegister = () => {
        router.push(PAGE_LINKS.REGISTER.STEP1.URL)
    }

    const onClickLogin = () => {
        router.push(PAGE_LINKS.LOGIN.URL)
    }

    const onClickLogOut = () => {
        logOut()
    }

    const onSuccessUpdateNotification = async (questionId: string) => {
        await refetchNotification()
        router.push(PAGE_LINKS.QA._QUESTIONS_ID(questionId).URL)
    }

    const onClickNotification = async (notificationId: string, questionId: string) => {
        updateNotification(notificationId, {
            onSuccess: () => onSuccessUpdateNotification(questionId),
            onError: () => errorToast(ERROR_MESSAGE.SERVER),
        })
    }

    const LoginOrProfile = () =>
        user && userMeta ? (
            <HStack spacing={{ base: 2, md: 4 }}>
                <NotificationButton notifications={notifications} seeNotification={onClickNotification} />
                <AvatarPopover user={user} userMeta={userMeta} seeProfile={onClickProfile} signOut={onClickLogOut} />
            </HStack>
        ) : (
            <RegisterAndLogin onClickRegister={onClickRegister} onClickLogin={onClickLogin} />
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
                h={HEADER_HEIGHT}
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
                                <ChakraNextImage
                                    src={LOGO_URL}
                                    alt="NexusSquare"
                                    width={180}
                                    height={45}
                                ></ChakraNextImage>
                            </Box>
                        </Link>
                    </Box>
                    <HStack
                        as="nav"
                        spacing="12%"
                        paddingX="0.5%"
                        aria-labelledby="jump to other functions"
                        display={{ base: 'none', md: 'flex' }}
                        paddingTop={1}
                    >
                        <NavigationLink url="/qa" funcName="学生生活Q&A" isComp={true} />
                        <NavigationLink url="/qa/post" funcName="質問投稿" isComp={true} />
                        <NavigationLink url="#" funcName="授業口コミ" isComp={false} />
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
                <NavigationLink url="/qa" funcName="学生生活Q&A" isComp={true} />
                <NavigationLink url="/qa/post" funcName="質問投稿" isComp={true} />
                <NavigationLink url="#" funcName="授業口コミ" isComp={false} />
            </HStack>
        </VStack>
    )
})
function pathPath(pathPath: any) {
    throw new Error('Function not implemented.')
}
