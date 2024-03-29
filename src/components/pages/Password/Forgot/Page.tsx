import { FormControl, FormErrorMessage, FormHelperText, FormLabel, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useSendPasswordResetEmail } from '../../../../hooks/authentication/usePassword'
import { useErrorToast } from '../../../../hooks/toast/useErrorToast'
import { useInfoToast } from '../../../../hooks/toast/useInfoToast'
import { pagesPath } from '../../../../lib/$path'
import { validators } from '../../../../lib/validator/Validators'
import { PrimaryButton } from '../../../ui/common/Button/PrimaryButton'
import { Input } from '../../../ui/common/Input'
import { TextLink } from '../../../ui/common/Link/TextLink'
import { FormLayout } from '../../../ui/features/FormLayout'
import toast, { Toaster } from 'react-hot-toast'

export const PasswordForgotPage = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { mutate, isLoading, error } = useSendPasswordResetEmail()
    const errorToast = useErrorToast()
    const infoToast = useInfoToast()

    const onSubmit = async (email: string) => {
        mutate(email, {
            onSuccess: () => {
                infoToast('パスワード再設定メールを送信しました。メールを確認してください。')
            },
            onError: (error) => {
                errorToast('メールが送信できませんでした。')
            },
        })
    }

    const router = useRouter()

    const onClickLogin = () => {
        router.push(pagesPath.login.$url())
    }
    return (
        <FormLayout
            title="パスワード再設定メールを送る
        "
        >
            <VStack
                as="form"
                w={'full'}
                paddingTop="20px"
                alignItems="center"
                spacing={8}
                onSubmit={handleSubmit((data) => onSubmit(data.email))}
            >
                <FormControl isInvalid={errors.email !== undefined} isRequired>
                    <FormLabel fontWeight={'bold'}>メールアドレス</FormLabel>
                    <Input id="email" {...register('email')} placeholder="xx000000@xxx.aichi-pu.ac.jp" type="email" />
                    <FormHelperText>愛知県立県大学のメールアドレスを入力</FormHelperText>
                </FormControl>
                <PrimaryButton
                    buttonText="メールを送信"
                    type="submit"
                    width={48}
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </VStack>
            <TextLink onClick={onClickLogin}>ログインはこちら</TextLink>
            <Toaster />
        </FormLayout>
    )
}
