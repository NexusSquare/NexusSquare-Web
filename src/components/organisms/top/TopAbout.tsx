import { Box, Heading, HStack, VStack, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import ChakraNextImage from '../../common/chakraNextImage'
import Image from 'next/image'
export const TopAbout = () => {
    const ICON_IMAGE_URL: string = '/android-chrome-512x512.png'

    return (
        <Box bgColor="white" paddingX={{ base: '5%', md: '10%' }} paddingY={'5%'}>
            <HStack>
                <VStack w={{ base: '100%', md: '50%' }} display={{ base: 'none', md: 'flex' }} justifyContent="center">
                    <Image src={ICON_IMAGE_URL} alt="サービスの画像" width={300} height={300} />
                </VStack>
                <VStack w={{ base: '100%', md: '50%' }} spacing="30px">
                    <Heading
                        w="full"
                        borderLeft={'5px solid'}
                        borderColor="mainColor"
                        padding={'10px 12px'}
                        fontSize="xl"
                    >
                        Nexus Squareとは
                    </Heading>
                    <Text>
                        Nexus Squareは、愛知県立大学の学生が立ち上げた団体です。
                        友人関係やサークルに参加しているかどうかで、人によって得られる情報が限られ、「情報格差」が生まれています。
                        そこで、授業・留学・就活など、大学生活で生まれる悩みを解決するため、
                        自由に質問・回答ができるサービスです。
                    </Text>
                </VStack>
            </HStack>
        </Box>
    )
}
