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
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { LINKS } from '../../../constants/links'
import { useLogin } from '../../../hooks/authentication'
import { PrimaryButton } from '../../common/PrimaryButton'
import { useAlertLoginError } from '../../../hooks/errors/useAlertLoginError'
import { UserAccount } from '../../../types/domain/user'
import { FormLayout } from '../../molecules/sign/FormLayout'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserAccount>()
    const { alertLoginError } = useAlertLoginError()

    const { mutate: login, isLoading: loading } = useLogin()

    const onSubmitAccount = async (account: UserAccount) => {
        login(account, {
            onSuccess: () => router.push(LINKS.QUESTION),
        })
    }

    const onClickRegister = () => {
        router.push(LINKS.REGISTER.STEP1)
    }
    return (
        <FormLayout title="ログイン">
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
                            // pattern: {
                            //     value: /^[a-z]{2}[0-9]{6}@[a-z]+\.aichi\-pu\.ac\.jp$/,
                            //     message: '愛知県立大学のメールアドレスを入力してください',
                            // },
                        })}
                        defaultValue={'aichi-pu.ac.jp'}
                        placeholder="xx000000@xxx.aichi-pu.ac.jp"
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
                <PrimaryButton buttonText="ログイン" type="submit" width={48} isLoading={loading} disabled={loading} />
            </VStack>
            <Text
                fontWeight={'bold'}
                fontSize={'sm'}
                as="button"
                _hover={{ textDecoration: 'underline' }}
                onClick={onClickRegister}
            >
                新規登録はこちら
            </Text>
        </FormLayout>
    )
}
