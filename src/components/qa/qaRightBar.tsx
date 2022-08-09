import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

const QaRightBar: Function = ({ children }: Props): JSX.Element => {
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
                <Box bgColor="red" h="210px" w="210px">
                    広告枠1
                </Box>
                <Box bgColor="red" h="210px" w="210px">
                    広告枠2
                </Box>
            </VStack>
            <Link href="/qa/post" passHref>
                <HStack
                    paddingLeft="13px"
                    spacing="0px"
                    as="a"
                    href="/qa/post"
                    bgColor="#FF9037"
                    h="60px"
                    w="210px"
                    whiteSpace="nowrap"
                    borderRadius="30px"
                    boxShadow="md"
                    color="white"
                    _hover={{ opacity: '50%' }}
                    _active={{ opacity: '50%', outline: 'none' }}
                    _focus={{ outline: 'none' }}
                >
                    <Text fontSize="3xl">？</Text>
                    <Text fontWeight="700" fontSize="2xl">
                        質問してみる
                    </Text>
                </HStack>
            </Link>
        </VStack>
    )
}
export default QaRightBar
