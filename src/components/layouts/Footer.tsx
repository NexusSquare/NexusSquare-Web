import { Box, HStack, Text, VStack, Flex, Wrap, WrapItem, Stack, Spacer } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { useSpMediaQuery } from '../../hooks/useSpMediaQuery'
import ChakraNextImage from '../common/chakraNextImage'

const copyRight = '© 2022 Nexus Square'

export const Footer = (): JSX.Element => {
    const { isSp } = useSpMediaQuery()
    if (isSp) {
        return <SPFooter />
    } else {
        return <PcFooter />
    }
}

const PcFooter = (): JSX.Element => {
    return (
        <VStack
            as="footer"
            bgColor="#FF9037"
            minH="200px"
            paddingTop={8}
            paddingBottom={4}
            justifyContent={'space-between'}
            spacing={4}
            w="100%"
            px={'10%'}
        >
            <HStack w={'full'} justifyContent={'space-between'}>
                <NexusSquareLogo />
                <Stack as="nav" direction={'row'} spacing={4}>
                    <FooterLinkList />
                </Stack>
            </HStack>
            <Box justifyContent={'right'} d="flex" w="full">
                <TwitterLink />
            </Box>

            <Text align={'end'} w={'full'} color="#FFDA77">
                {copyRight}
            </Text>
        </VStack>
    )
}

const SPFooter = (): JSX.Element => {
    return (
        <VStack
            as="footer"
            bgColor="#FF9037"
            spacing={4}
            w="100%"
            minH="200px"
            paddingTop={4}
            paddingBottom={4}
            paddingX={4}
            justifyContent={'space-between'}
        >
            <Stack as="nav" direction={'column'} align="center" w={'full'} spacing={4} justifyContent={'space-between'}>
                <NexusSquareLogo />
                <FooterLinkList />
                <TwitterLink />
            </Stack>

            <Text align={'center'} w={'full'} color="#FFDA77">
                {copyRight}
            </Text>
        </VStack>
    )
}

const FooterLinkList = () => {
    return (
        <>
            <FooterLink href="/" text="About" />
            <FooterLink href="/rule" text="利用規約" />
            <FooterLink href="privacy" text="プライバシー ポリシー" />
        </>
    )
}

interface FooterLinkProps {
    href: string
    text: string
}

const FooterLink = ({ href, text }: FooterLinkProps): JSX.Element => {
    return (
        <Link href={href} passHref>
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

const NexusSquareLogo = () => {
    const LOGO_URL: string = '/images/logo.jpg'
    return <ChakraNextImage src={LOGO_URL} alt="NexusSquare" width={180} height={45}></ChakraNextImage>
}

const TwitterLink = () => {
    const TWITTER_URL: string = 'https://twitter.com/NexusSquare_apu'
    return (
        <Link href={TWITTER_URL} passHref>
            <HStack as="a" target="_blank">
                <BsTwitter size={30} color="white" />
            </HStack>
        </Link>
    )
}
