import type { NextPage } from 'next'
import {
    Box,
    Button,
    HStack,
    IconButton,
    Image,
    Spacer,
    Text,
    VStack,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import QARequest from '../types/api/qa/qaRequest'
import userPost from '../types/domain/account/userPost'
import Layout from '../components/common/Layout'

const LoginPage: NextPage = () => {
    const [userId, setUserId] = useState<string>('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<userPost>()
    const back2Before = () => {
        router.back()
    }
    return (
        <Layout pageName="ログイン">
            <VStack paddingTop="60px">
                <Button margin="10px 2% 0px" alignSelf="start" bgColor="#FF9037" color="white" onClick={back2Before}>
                    戻る
                </Button>
                <VStack
                    bgColor="whitesmoke"
                    borderRadius="24px"
                    w={{ base: '100%', sm: '80vw', md: 'calc(100vw - 270px)', lg: '50vw' }}
                    h="500px"
                    paddingY="15px"
                >
                    <Text as="h2" fontSize="4xl" fontWeight="semibold">
                        ログイン
                    </Text>
                    <Box
                        as="form"
                        onSubmit={handleSubmit((data) => console.log(`${data}送信完了`))}
                        w="90%"
                        textAlign="center"
                    >
                        <FormControl isInvalid={errors.id !== undefined} padding="10px 0px 20px">
                            <FormLabel htmlFor="id">ID</FormLabel>
                            <Input
                                id="id"
                                {...register('id', {
                                    required: '必須項目です',
                                    minLength: { value: 1, message: 'idは最小1文字必要です' },
                                    maxLength: { value: 50, message: 'idは50文字までです' },
                                })}
                                placeholder="idを入力"
                                bgColor="white"
                            />
                            <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.password !== undefined} padding="10px 0px 20px">
                            <FormLabel htmlFor="password">パスワード</FormLabel>
                            <Input
                                id="password"
                                {...register('password', {
                                    required: '必須項目です',
                                    minLength: { value: 1, message: 'idは最小1文字必要です' },
                                    maxLength: { value: 300, message: 'idは50文字までです' },
                                })}
                                placeholder="パスワードを入力"
                                bgColor="white"
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" margin="10px 0px 20px" bgColor="#FF9037" color="white">
                            ログイン
                        </Button>
                    </Box>
                </VStack>
            </VStack>
        </Layout>
    )
}
export default LoginPage
