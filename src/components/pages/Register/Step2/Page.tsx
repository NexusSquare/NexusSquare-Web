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
import { useEffect, useState } from 'react'
import { useSendEmail } from '../../../../hooks/authentication'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'

import { PrimaryButton } from '../../../common/PrimaryButton'

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
        <HStack w="100%" h="full" paddingX={{ base: 4, md: 0 }}>
            <VStack
                bg="white"
                w={{ base: 'full', md: '2xl' }}
                marginX={'auto'}
                paddingY={12}
                paddingX={{ base: 8, md: 24 }}
            >
                <Box as="h2" fontWeight={'bold'} fontSize={'xl'}>
                    メールアドレス認証
                </Box>
                <Divider />
                <VStack spacing={8}>
                    <Box mt={8}>
                        <Text>登録されたメールアドレス宛に受信確認メールを送信しました。</Text>
                        <Text>メールをご確認いただき、メールに記載されてURLをクリックし、本登録を完了させて下さい</Text>
                    </Box>
                    {hasSentEmail && <Text color={'red.500'}>メールを送信しました。</Text>}
                    <PrimaryButton
                        buttonText="認証メールを送る"
                        type="button"
                        isLoading={sending}
                        disabled={sending}
                        onClick={onClickSendEmail}
                    />
                </VStack>
            </VStack>
        </HStack>
    )
}
