import { Box, HStack, Spacer, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import ChakraNextImage from './chakraNextImage'
import { BsTwitter } from 'react-icons/bs'

const DefaultFooter: Function = () => {
    const LOGO_URL: string = '/images/logo.jpg'
    const TWITTER_URL: string = 'https://twitter.com/NexusSquare_apu'
    return (
        <VStack as="footer" bgColor="#FF9037" spacing="0px" w="100%" minH="200px" paddingTop="50px">
            <Stack w={{ base: '100%', md: '80%' }} direction={{ base: 'column', md: 'row' }}>
                <Box d="flex" justifyContent="center">
                    <ChakraNextImage src={LOGO_URL} alt="ロゴ" width={270} height={54}></ChakraNextImage>
                </Box>
                <Spacer />
                <Stack as="nav" direction={{ base: 'column', md: 'row' }} align="center" spacing="30px">
                    <Link href="/" passHref>
                        <Box
                            as="a"
                            href="/"
                            whiteSpace="nowrap"
                            fontWeight="700"
                            color="white"
                            fontSize="large"
                            _hover={{ textDecoration: 'underline' }}
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
                            href="/"
                            whiteSpace="nowrap"
                            fontWeight="700"
                            color="white"
                            fontSize="large"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            プライバシー・ポリシー
                        </Box>
                    </Link>
                </Stack>
            </Stack>
            <Spacer />
            <HStack paddingTop="30px" justifyContent={{ base: 'center', md: 'end' }} w={{ base: '100%', md: '80%' }}>
                <Link href={TWITTER_URL} passHref>
                    <HStack as="a" target="_blank">
                        <BsTwitter size={50} color="white" />
                    </HStack>
                </Link>
            </HStack>
            <Spacer />
            <Text
                align={{ base: 'center', md: 'end' }}
                w={{ base: '100%', md: '80%' }}
                color="#FFDA77"
                paddingTop="30px"
                paddingBottom="5px"
            >
                &copy; 2022 Nexus Square
            </Text>
        </VStack>
    )
}
export default DefaultFooter
