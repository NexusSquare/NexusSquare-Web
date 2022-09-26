import { BellIcon } from '@chakra-ui/icons'
import {
    Avatar,
    baseStyle,
    Box,
    Button,
    chakra,
    ChakraComponent,
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
    Spinner,
    Stack,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ReactNode } from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { clientApi } from '../../lib/axios'
import User from '../../types/domain/account/User'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import ChakraNextImage from '../common/chakraNextImage'

interface Props {
    children?: ReactNode
}
interface headerFuncProps {
    url: string
    isComp: boolean
    funcName: string
}

export const Header = ({ children }: Props): JSX.Element => {
    console.log('render')
    const LOGO_URL: string = '/images/logo2.jpg'
    const ICON_IMAGE_URL: string = 'https://bit.ly/broken-link'
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isNotice, setIsNotice] = useState(false)
    const [user, setUser] = useState<User>()
    const router = useRouter()
    const errorToast = useErrorToast()

    const HeaderFunction: React.VFC<headerFuncProps> = (props) => {
        return props.isComp ? (
            <Link href={props.url} passHref>
                <Box
                    as="a"
                    href={props.url}
                    paddingTop="10px"
                    whiteSpace="nowrap"
                    fontWeight="700"
                    color="white"
                    fontSize="large"
                    _hover={{ textDecoration: 'underline' }}
                >
                    {props.funcName}
                </Box>
            </Link>
        ) : (
            <Box
                whiteSpace="nowrap"
                paddingTop="10px"
                onClick={() => alert('今後実装予定！お楽しみに！')}
                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
                fontWeight="700"
                color="white"
                fontSize="large"
            >
                {props.funcName}
            </Box>
        )
    }
    const NotificationButton = () =>
        isNotice ? (
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
        ) : (
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
        )
    const LoginOrProfile = () =>
        isLoggedIn ? (
            <HStack spacing="10%" w="105px">
                <NotificationButton />
                <Popover>
                    <PopoverTrigger>
                        <Avatar as="button" width="40px" height="40px" src={ICON_IMAGE_URL} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight="semibold">
                            <HStack py="4" px="2" spacing="4">
                                <Avatar as="button" width="40px" height="40px" src={ICON_IMAGE_URL} />
                                <VStack w="full" alignItems={'left'} spacing="0">
                                    <Text>
                                        {user?.lastname} {user?.firstname}
                                    </Text>
                                    <Text fontSize={'xs'}>{user?.mailAddress}</Text>
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
                                onClick={() => router.push('/profile')}
                            >
                                <FiEdit />
                                <Text>プロフィールを確認する</Text>
                            </HStack>
                            <Divider />
                            <HStack as="button" py="4" px="2" w="full" _hover={{ bgColor: 'gray.100' }}>
                                <VscSignOut />
                                <Text>サインアウト</Text>
                            </HStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </HStack>
        ) : (
            <HStack spacing="10%" w="200px" justify="end">
                <Button
                    bgColor="mainColor"
                    color="white"
                    borderWidth={1}
                    borderColor="white"
                    fontWeight={'bold'}
                    _hover={{ bgColor: 'white', color: 'mainColor' }}
                >
                    新規登録
                </Button>
                <Button bgColor="#FFF">
                    <Link href="/login" passHref>
                        ログイン
                    </Link>
                </Button>
            </HStack>
        )

    return (
        <VStack
            as="header"
            w="100%"
            bgColor="#FF9037"
            spacing="0px"
            divider={<StackDivider borderColor="#FFDA77" />}
            position="fixed"
            top="0"
            zIndex={'sticky'}
        >
            <HStack
                h="60px"
                paddingX={{ base: '10px', sm: '50px' }}
                paddingY={{ base: '0px', md: '10px' }}
                w="100%"
                bgColor="#FF9037"
            >
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
                                alt="ロゴ"
                                minW="120px"
                                minH="30px"
                                maxW="180px"
                                maxH="45px"
                                width={180}
                                height={45}
                                borderColor="#FF9037"
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
                >
                    <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                    <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
                </HStack>
                <Spacer />
                <LoginOrProfile />
            </HStack>
            <HStack
                h="40px"
                as="nav"
                spacing="12%"
                paddingY="0px"
                paddingX={{ base: '10px', sm: '50px' }}
                aria-labelledby="jump to other functions - mini version"
                display={{ base: 'flex', md: 'none' }}
                alignSelf="start"
            >
                <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
            </HStack>
        </VStack>
    )
}
