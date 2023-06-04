import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSendEmail } from '../../../../hooks/authentication'
import { useErrorToast } from '../../../../hooks/toast/useErrorToast'
import { useInfoToast } from '../../../../hooks/toast/useInfoToast'
import { useConsoleLog } from '../../../../hooks/useConsoleLog'

import { PrimaryButton } from '../../../ui/common/Button/PrimaryButton'
import { FormLayout } from '../../../ui/features/FormLayout'

export const Page = (): JSX.Element => {
    const { mutate: sendEmail, isLoading: sending, error } = useSendEmail()

    const [hasSentEmail, setHasSentEmail] = useState(false)
    const errorToast = useErrorToast()
    const infoToast = useInfoToast()
    const onClickSendEmail = async () => {
        sendEmail(undefined, {
            onSuccess: () => infoToast('メールを送信しました。'),
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
                    <Text>
                        メールをご確認いただき、メールに記載されているURLをクリックし、本登録を完了させて下さい。
                    </Text>
                    <Text>※認証メールは迷惑メールフォルダに送信されている場合があります。 </Text>
                </Box>
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
