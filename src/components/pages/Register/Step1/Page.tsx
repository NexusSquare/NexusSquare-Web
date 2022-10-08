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
    Text,
    VStack,
} from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ERROR, ERROR_MESSAGE } from '../../../../constants/errors'
import { LINKS } from '../../../../constants/links'
import { useCreateAccount, useSendEmail } from '../../../../hooks/authentication'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'

import { PrimaryButton } from '../../../common/PrimaryButton'
import { AuthError } from '../../../../types/error'
import { UserAccount } from '../../../../types/domain/user'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserAccount>()
    const errorToast = useErrorToast()

    const { mutate: createAccount, isLoading: createUserLoading } = useCreateAccount()
    const { mutate: sendEmail } = useSendEmail()

    const onSuccessCreateAccount = async () => {
        await sendEmail()
        router.push(LINKS.REGISTER.STEP2)
    }

    const displayErrorMessage = (errorMessage: string) => {
        if (errorMessage === ERROR.EMAIL_ALREADY_EXISTS) {
            errorToast(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS)
        } else {
            errorToast(ERROR_MESSAGE.SERVER)
        }
    }

    // TODO errorハンドリングが隠蔽できていない。
    const onSubmitAccount = async (account: UserAccount) => {
        createAccount(account, {
            onSuccess: onSuccessCreateAccount,
            onError: (error: AuthError) => displayErrorMessage(error.code),
        })
    }

    const onClickLogin = () => {
        router.push(LINKS.LOGIN)
    }
    return (
        <HStack w="100%" h="full" paddingX={{ base: 4, md: 0 }}>
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
                    onSubmit={handleSubmit((account) => onSubmitAccount(account))}
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
                                    value: /^(?=.*?[a-zA-z])(?=.*?\d)[a-zA-z\d]{8,16}$/i,
                                    message: '半角英数を含めて下さい',
                                },
                            })}
                            placeholder="********"
                            type="password"
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        <FormHelperText>半角英数8~16</FormHelperText>
                    </FormControl>
                    <PrimaryButton
                        buttonText="新規登録"
                        type="submit"
                        width={48}
                        isLoading={createUserLoading}
                        disabled={createUserLoading}
                    />
                </VStack>
                <Text
                    fontWeight={'bold'}
                    fontSize={'sm'}
                    as="button"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={onClickLogin}
                >
                    ログインはこちら
                </Text>
            </VStack>
        </HStack>
    )
}
