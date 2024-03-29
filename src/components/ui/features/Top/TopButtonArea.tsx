import { VStack, Text, Heading } from '@chakra-ui/react'
import React from 'react'
import QAButton from '../../common/Button/QAButton'

export const TopButtonArea = () => {
    return (
        <VStack paddingY={'5%'} paddingX={{ base: '5%', md: '10%' }} spacing="30px">
            <Heading borderBottom="2px solid" borderColor="primary" fontSize={{ base: '2xl', md: '4xl' }}>
                ネクスクに投稿しよう!
            </Heading>
            <QAButton />
        </VStack>
    )
}
