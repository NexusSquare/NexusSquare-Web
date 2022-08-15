import { Box, Center, HStack, Text, VStack, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

const Footer: Function = ({ children }: Props): JSX.Element => {
    return (
        <VStack as="footer" bgColor="#FF9037" spacing="0px" w="100%">
            <VStack
                as="nav"
                paddingTop="10px"
                paddingX="50px"
                marginBottom="10px"
                w="100%"
                spacing="8%"
                align="start"
                justify="center"
            >
                <Link href="/" passHref>
                    <Box
                        as="a"
                        href="/"
                        whiteSpace="nowrap"
                        fontWeight="700"
                        color="white"
                        fontSize="large"
                        _hover={{ textDecoration: 'underline' }}
                        textAlign="center"
                    >
                        About
                    </Box>
                </Link>
                <Link href="/rule" passHref>
                    <Box
                        as="a"
                        href="/rule"
                        whiteSpace="nowrap"
                        fontWeight="700"
                        color="white"
                        fontSize="large"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        利用規約
                    </Box>
                </Link>

                <Link href="/privacy" passHref>
                    <Box
                        as="a"
                        href="/privacy"
                        whiteSpace="nowrap"
                        fontWeight="700"
                        color="white"
                        fontSize="large"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        プライバシー・ポリシー
                    </Box>
                </Link>
            </VStack>
            <Text color="#FFDA77">&copy; 2022 Nexus Square</Text>
        </VStack>
    )
}

export default Footer
