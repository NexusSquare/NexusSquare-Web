import { HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { TbZoomQuestion } from 'react-icons/tb'

const QAButton = (): JSX.Element => {
    return (
        <Link href="/qa/post" passHref>
            <HStack
                spacing={2}
                as="a"
                href="/qa/post"
                bgColor="mainColor"
                whiteSpace="nowrap"
                borderRadius="30px"
                paddingX={8}
                paddingY={2}
                boxShadow="md"
                color="white"
                _hover={{ bgColor: 'subSubColor' }}
                _active={{ opacity: '50%', outline: 'none' }}
                _focus={{ outline: 'none' }}
            >
                <TbZoomQuestion size={32} />
                <Text fontWeight="700" fontSize="2xl">
                    質問する
                </Text>
            </HStack>
        </Link>
    )
}

export default QAButton
