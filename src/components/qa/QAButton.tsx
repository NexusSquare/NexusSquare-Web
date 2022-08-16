import { HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const QAButton = (): JSX.Element => {
    return (
        <Link href="/qa/post" passHref>
            <HStack
                paddingLeft="13px"
                spacing="0px"
                as="a"
                href="/qa/post"
                bgColor="mainColor"
                h="60px"
                w="210px"
                whiteSpace="nowrap"
                borderRadius="30px"
                boxShadow="md"
                color="white"
                _hover={{ bgColor: 'subSubColor' }}
                _active={{ opacity: '50%', outline: 'none' }}
                _focus={{ outline: 'none' }}
            >
                <Text fontSize="3xl">？</Text>
                <Text fontWeight="700" fontSize="2xl">
                    質問してみる
                </Text>
            </HStack>
        </Link>
    )
}

export default QAButton