import { Box, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { pagesPath } from '../../lib/$path'
import { PrimaryButton } from './Button/PrimaryButton'

interface Props {
    title: string
}
export const NoItem: FC<Props> = ({ title }) => {
    const router = useRouter()
    const onClick = () => {
        router.push(pagesPath.$url())
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
