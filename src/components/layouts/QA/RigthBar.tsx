import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import QAButton from '../../qa/QAButton'

interface Props {
    children?: ReactNode
}

export const RightBar = ({ children }: Props): JSX.Element => {
    return (
        <VStack
            as="aside"
            bgColor="#FBF6F0"
            h="calc(100vh - 60px)"
            w="calc((100vw - 800px) / 2)"
            minW="210px"
            display={{ base: 'none', md: 'flex' }}
            position="fixed"
            top="60px"
            right="0"
        >
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
