import { Box, HStack, Text, VStack, Flex, Wrap, WrapItem, Stack, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import ChakraNextImage from '../common/chakraNextImage'

export const Footer = (): JSX.Element => {
    const LOGO_URL: string = '/images/logo.jpg'
    const TWITTER_URL: string = 'https://twitter.com/NexusSquare_apu'
    return (
        <VStack as="footer" bgColor="#FF9037" spacing="0px" w="100%" minH="200px" paddingTop={8}>
            <Stack as="nav" direction={{ base: 'column', md: 'row' }} align="center" spacing={4}>
                <ChakraNextImage src={LOGO_URL} alt="NexusSquare" width={180} height={45}></ChakraNextImage>

                <FooterLink href="/" text="About" />
                <FooterLink href="/rule" text="利用規約" />
                <FooterLink href="privacy" text="プライバシーポリシー" />
                <Link href={TWITTER_URL} passHref>
                    <HStack as="a" target="_blank">
                        <BsTwitter size={30} color="white" />
                    </HStack>
                </Link>
            </Stack>

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

interface FooterLinkProps {
    href: string
    text: string
}

const FooterLink = ({ href, text }: FooterLinkProps): JSX.Element => {
    return (
        <Link href="/privacy" passHref>
            <Box
                as="a"
                href={href}
                whiteSpace="nowrap"
                fontWeight="700"
                color="white"
                fontSize="large"
                _hover={{ textDecoration: 'underline' }}
            >
                {text}
            </Box>
        </Link>
    )
}
