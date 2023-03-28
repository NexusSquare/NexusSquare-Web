import { HStack, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsChatText } from 'react-icons/bs'

interface Props {
    text: string
}
export const NoCards = ({ text }: Props): JSX.Element => {
    return (
        <HStack justify={'center'} py="4" h="50vh">
            <VStack>
                <BsChatText color={'#a0acc0'} size={100} />
                <Text color="gray.400">{text}</Text>
            </VStack>
        </HStack>
    )
}
