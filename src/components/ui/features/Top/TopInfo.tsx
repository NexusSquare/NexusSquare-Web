import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import Image from 'next/image'
export const TopInfo = () => {
    const TOP_INFO_URL: string = '/images/ui_img.png'
    const router = useRouter()
    const onClickLogin = () => {
        router.push(PAGE_LINKS.LOGIN.URL)
    }

    return (
        <Box
            paddingY={'5%'}
            paddingX={{ base: '5%', md: '10%' }}
            bgColor="subColor"
            background={'linear-gradient(0deg, transparent calc(10vw - 1px), #FBF6F0  10vw, white 100%)'}
        >
            <Stack direction={{ base: 'column-reverse', md: 'row' }} spacing="50px">
                <HStack w={{ base: '100%', md: '50%' }}>
                    <VStack align="start" spacing="30px" pb={12}>
                        <Heading lineHeight="150%" fontSize={{ base: '2xl', md: '4xl' }}>
                            <Box borderBottom="2px solid" as="span" borderColor="primary">
                                大学生活でわからないことがあるときはここで解決！
                            </Box>
                        </Heading>
                        <Text>
                            Nexus Square（ネクスク）は、県大生が作った県大生のための情報共有サービスです。
                            「この教養の授業気になるけど内容が分からないから教えてほしい！」などの疑問を県大の学生に相談しましょう!
                            <br></br>
                            ※愛知県立大学の学生有志が運営しています。愛知県立大学は運営に関係していません。
                        </Text>
                        <Button
                            size="lg"
                            color="primary"
                            bgColor="white"
                            borderWidth={1}
                            borderColor="primary"
                            _hover={{ bgColor: 'primary', color: 'white' }}
                            w={{ base: 'full', md: 'auto' }}
                            onClick={onClickLogin}
                        >
                            新規登録 / ログイン
                        </Button>
                    </VStack>
                </HStack>
                <VStack w={{ base: '100%', md: '50%' }} justifyContent="center">
                    <Image src={TOP_INFO_URL} alt="サービスの画像" width={500} height={500} />
                </VStack>
            </Stack>
        </Box>
    )
}
