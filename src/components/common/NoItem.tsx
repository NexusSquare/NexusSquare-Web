import { Box, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { PrimaryButton } from './buttons/PrimaryButton'

interface Props {
    title: string
}
export const NoItem: FC<Props> = ({ title }) => {
    const onClick = () => {
        window.location.href = '/'
    }
    return (
        <VStack justifyContent={'center'} alignItems={'center'} h={'100vh'}>
            <Text textAlign="center" fontSize={'lg'}>
                {title}が見つかりませんでした。
            </Text>
            <PrimaryButton buttonText="トップに戻る" onClick={onClick} />
        </VStack>
    )
}
