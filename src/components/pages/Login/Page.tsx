import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { useLogin } from '../../../hooks/authentication'
import { PrimaryButton } from '../../common/buttons/PrimaryButton'

import { UserAccount } from '../../../entities/user'
import { FormLayout } from '../../molecules/common/FormLayout'
import { validators } from '../../../lib/validator/Validators'

import { TextLink } from '../../common/TextLink'
import { pagesPath } from '../../../lib/$path'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserAccount>()

    const { mutate: login, isLoading: loading } = useLogin()

    const onSubmitAccount = async (account: UserAccount) => {
        login(account)
    }

    const onClickRegister = () => {
        router.push(PAGE_LINKS.REGISTER.STEP1.URL)
    }

    const onClickForgotPassword = () => {
        router.push(pagesPath.password.forgot.$url())
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
            <VStack alignItems="center" spacing={1}>
                <TextLink as="button" onClick={onClickRegister}>
                    新規登録はこちら
                </TextLink>
                <Text as="button" onClick={onClickForgotPassword} fontWeight={'normal'} fontSize={'sm'}>
                    パスワードを忘れた方
                </Text>
            </VStack>
        </FormLayout>
    )
}
