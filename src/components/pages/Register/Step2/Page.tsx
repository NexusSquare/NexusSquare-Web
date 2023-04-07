import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSendEmail } from '../../../../hooks/authentication'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'

import { PrimaryButton } from '../../../common/Button/PrimaryButton'
import { FormLayout } from '../../../molecules/common/FormLayout'

export const Page = (): JSX.Element => {
    const { mutate: sendEmail, isLoading: sending, error } = useSendEmail()

    const [hasSentEmail, setHasSentEmail] = useState(false)
    const errorToast = useErrorToast()
    const onClickSendEmail = async () => {
        await sendEmail({
            onSuccess: () => setHasSentEmail(true),
            onError: () => {
                errorToast('メールが送信されませんでした。')
            },
        })
    }

    return (
        <FormLayout title="メールアドレス認証">
            <VStack spacing={8}>
                <Box mt={8}>
                    <Text>登録されたメールアドレス宛に受信確認メールを送信しました。</Text>
                    <Text>メールをご確認いただき、メールに記載されてURLをクリックし、本登録を完了させて下さい</Text>
                </Box>
                {hasSentEmail && <Text color={'red.500'}>メールを送信しました。</Text>}
                <PrimaryButton
                    buttonText="メールを再度送信"
                    type="button"
                    isLoading={sending}
                    disabled={sending}
                    onClick={onClickSendEmail}
                />
            </VStack>
        </FormLayout>
    )
}
