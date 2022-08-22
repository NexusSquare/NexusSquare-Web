import { BellIcon } from '@chakra-ui/icons'
import {
    baseStyle,
    Box,
    Button,
    chakra,
    ChakraComponent,
    HStack,
    IconButton,
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
import ChakraNextImage from './chakraNextImage'
import { useSession, signIn, signOut } from 'next-auth/react'
import { memo } from 'react'
import { useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { clientApi } from '../../lib/axios'
import User from '../../types/domain/account/User'
import { useErrorToast } from '../../hooks/useErrorToast'
import { useRouter } from 'next/router'

interface Props {
    children?: ReactNode
}
interface headerFuncProps {
    url: string
    isComp: boolean
    funcName: string
}
const Header = ({ children }: Props): JSX.Element => {
    const LOGO_URL: string = '/images/nexus-square.png'
    const ICON_IMAGE_URL: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH
        ? process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH
        : ''
    const { data: session, status } = useSession()
    const userId = session?.user?.email
    const [isLogined, setIsLogined] = useState(status === 'authenticated')
    const [isNotice, setIsNotice] = useState(false)
    const router = useRouter()
    const errorToast = useErrorToast()

    const fetchProfile = async () => {
        await clientApi
            .get(`/user/${userId}`, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then(() => {
                return
            })
            .catch((err: AxiosError) => {
                if (!err.response) {
                    errorToast()
                }
                if (err.response?.status === 500) {
                    // 本番だと405
                    router.push('/profile/register')
                } else {
                    errorToast()
                }
            })
    }

    useEffect(() => {
        setIsLogined(status === 'authenticated')
    }, [status])

    useEffect(() => {
        if (!isLogined) return
        fetchProfile()
    }, [isLogined])

    if (status === 'loading') {
        return (
            <HStack d={'flex'} justifyContent={'center'}>
                <Spinner />
            </HStack>
        )
    }
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
    const NotificateButton = () =>
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
        isLogined ? (
            <HStack spacing="10%" w="105px">
                <NotificateButton />
                <Box width="40px" height="40px">
                    <ChakraNextImage
                        src={ICON_IMAGE_URL}
                        alt="プロフィール"
                        borderRadius="50%"
                        width={50}
                        height={50}
                    ></ChakraNextImage>
                </Box>
                <Button onClick={() => signOut()}>サインアウト</Button>
            </HStack>
        ) : (
            <HStack spacing="10%" w="200px" justify="end">
                <Button onClick={() => signIn('cognito')}>新規登録</Button>
                <Link href="/login" passHref>
                    <Box
                        as="a"
                        href="/login"
                        h="40px"
                        w="85px"
                        padding="8px 10px"
                        fontWeight="semibold"
                        fontSize={{ md: 'md', base: 'sm' }}
                        bgColor="#FFDA77"
                        borderRadius="10px"
                        _hover={{ opacity: '50%' }}
                        _active={{ opacity: '50%', outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        ログイン
                    </Box>
                </Link>
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
                                minW="150px"
                                minH="30px"
                                maxW="225px"
                                maxH="45px"
                                width={225}
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

export default memo(Header)
