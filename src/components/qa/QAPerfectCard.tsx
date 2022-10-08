import { NotAllowedIcon } from '@chakra-ui/icons'
import { Avatar, Box, HStack, IconButton, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Question } from '../../types/domain/qa'
import ChakraNextImage from '../common/chakraNextImage'

interface Props {
    question: Question
}

export const QAPerfectCard = ({ question }: Props) => {
    const DEFAULT_AVATAR_URL: string = 'https://bit.ly/broken-link'

    const categoryTxt = question.categories[0]
        ? `${question.categories[0]}、${question.categories[1]}`
        : question.categories[0]
    const QuestionImage = (): JSX.Element => {
        return question.imageUrl ? (
            <Box>
                <ChakraNextImage src={question.imageUrl} alt="質問の画像" width={200} height={200} />
            </Box>
        ) : (
            <></>
        )
    }
    return (
        <VStack
            as="section"
            p="4"
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
            minH="200px"
            bgColor={'white'}
            w="full"
        >
            <Text color="gray.400" w="full">
                {categoryTxt}
            </Text>
            <HStack w="full">
                <Box as="figure" width="30px" height="30px">
                    <Avatar width="full" height="full" src={question.postUser.imageUrl} />
                </Box>

                <VStack spacing="0px">
                    <Text fontWeight="400" w="full">
                        {question.postUser.nickname}
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 0, md: '2' }}>
                        <Text fontWeight="400" fontSize="sm" color="gray.400">
                            作成日:
                        </Text>
                        <Text fontWeight="400" fontSize="sm" color="gray.400">
                            更新日:
                        </Text>
                    </Stack>
                </VStack>
                <Spacer />
                <HStack>
                    <Text as="h2">{question.ansNum}</Text>
                    <Text>回答</Text>
                </HStack>
            </HStack>

            <Text fontSize="2xl" fontWeight="semibold" w="full">
                {question.title}
            </Text>

            <Text w="full">{question.content}</Text>
            <QuestionImage />
            <IconButton
                alignSelf={'end'}
                aria-label="通報する"
                icon={<NotAllowedIcon />}
                variant="outline"
            ></IconButton>
        </VStack>
    )
}
