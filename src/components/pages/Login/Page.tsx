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
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { useLogin } from '../../../hooks/authentication'
import { PrimaryButton } from '../../common/PrimaryButton'
import { useAlertLoginError } from '../../../hooks/errors/useAlertLoginError'
import { UserAccount } from '../../../entities/user'
import { FormLayout } from '../../molecules/sign/FormLayout'
import { validators } from '../../../lib/validator/Validators'
import { pagesPath } from '../../../plugins/$path'

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
            onSuccess: () => router.push(pagesPath.qa.$url()),
        })
    }

    const onClickRegister = () => {
        router.push(PAGE_LINKS.REGISTER.STEP1.URL)
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
                            validate: validators.requiredForEmailPatter(),
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
                            validate: {
                                maxLength: validators.requiredMaxLength('パスワード', 16),
                                minLength: validators.requiredMinLength('パスワード', 8),
                                pattern: validators.requiredForPassword(),
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
