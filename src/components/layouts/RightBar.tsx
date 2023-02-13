import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import QAButton from '../atoms/QAButton'
import { RIGHT_BAR_HEIGHT, RIGHT_BAR_MINI_WIDTH, RIGHT_BAR_WIDTH } from './constants'

interface Props {
    children?: ReactNode
}

export const RightBar = ({ children }: Props): JSX.Element => {
    return (
        <VStack as="aside" bgColor="#FBF6F0" h={RIGHT_BAR_HEIGHT} w={RIGHT_BAR_WIDTH} minW={RIGHT_BAR_MINI_WIDTH}>
            <VStack spacing="15px" margin="30px 10px">
                <Box bgColor="gray.200" h="210px" w="210px">
                    広告枠1
                </Box>
                <Box bgColor="gray.200" h="210px" w="210px">
                    広告枠2
                </Box>
            </VStack>
            <QAButton />
        </VStack>
    )
}
