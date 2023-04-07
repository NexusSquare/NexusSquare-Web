import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { UserAccount } from '../../../../entities/user'
import { useLogin } from '../../../../hooks/authentication'
import { validators } from '../../../../lib/validator/Validators'
import { PrimaryButton } from '../../../common/Button/PrimaryButton'
import { FormLayout } from '../../../molecules/common/FormLayout'

export const AdminLoginPage = (): JSX.Element => {
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

    const onClickTop = () => {
        router.push(PAGE_LINKS.HOME.URL)
    }
    return (
        <FormLayout title="管理者用ログイン">
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
                    <Input id="mail" type="email" {...register('email')} />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
                onClick={onClickTop}
            >
                トップページはこちら
            </Text>
        </FormLayout>
    )
}
