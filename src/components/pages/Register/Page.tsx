import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import account from '../../../types/domain/account/account'
import { PrimaryButton } from '../../common/PrimaryButton'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<account>()

    return (
        <Box w="100%" bg="subColor" h="full" paddingTop={{ base: 24, md: 48 }} paddingX={{ base: 4, md: 0 }}>
            <VStack
                bg="white"
                w={{ base: 'full', md: '2xl' }}
                marginX={'auto'}
                paddingY={12}
                paddingX={{ base: 8, md: 24 }}
            >
                <Box as="h2" fontWeight={'bold'} fontSize={'xl'}>
                    新規登録
                </Box>
                <Divider />

                <VStack
                    as="form"
                    onSubmit={handleSubmit((data) => console.log(`${data}送信完了`))}
                    w={'full'}
                    paddingTop="20px"
                    alignItems="center"
                    spacing={8}
                >
                    <FormControl isInvalid={errors.email !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'}>メールアドレス</FormLabel>
                        <Input
                            id="mail"
                            {...register('email', {
                                required: '必須項目です',
                                minLength: { value: 1, message: 'タイトルは最小1文字必要です' },
                                maxLength: { value: 50, message: 'タイトルは50文字までです' },
                                pattern: {
                                    value: /^[a-z]{2}[0-9]{6}@[a-z]+\.aichi\-pu\.ac\.jp$/,
                                    message: '愛知県立大学のメールアドレスを入力してください',
                                },
                            })}
                            placeholder="xx000000.xxx.aichi-pu.ac.jp"
                            type="email"
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        <FormHelperText>愛知県立県大学のメールアドレスを入力</FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={errors.password !== undefined} isRequired>
                        <FormLabel htmlFor="password" fontWeight={'bold'}>
                            パスワード
                        </FormLabel>
                        <Input
                            id="password"
                            {...register('password', {
                                required: '必須項目です',
                                minLength: { value: 8, message: 'パスワードは最小8文字必要です' },
                                maxLength: { value: 16, message: 'パスワードは16文字までです' },
                                pattern: {
                                    value: /^[A-Za-z0-9]+$/i,
                                    message: '半角英数を含めて下さい',
                                },
                            })}
                            placeholder="********"
                            type="password"
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        <FormHelperText>半角英数8~16</FormHelperText>
                    </FormControl>
                    <PrimaryButton buttonText="新規登録" type="submit" width={48} />
                </VStack>
            </VStack>
        </Box>
    )
}
