import { NotAllowedIcon } from '@chakra-ui/icons'
import { Avatar, Box, HStack, IconButton, Image, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import PerfectQuestion from '../../types/domain/qa/PerfectQuestion'
import ChakraNextImage from '../common/chakraNextImage'

interface Props {
    question: PerfectQuestion
}

export const QAPerfectCard = ({ question }: Props) => {
    const DEFAULT_AVATAR_URL: string = 'https://bit.ly/broken-link'
    const DEFAULT_ICON_IMAGE_PATH: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH
        ? `/images/${process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH}`
        : DEFAULT_AVATAR_URL
    const ICON_IMAGE_URL: string = question.userIcon ? question.userIcon : DEFAULT_ICON_IMAGE_PATH
    const REGEX: RegExp = /^([1-9][0-9]{3})\-0*([1-9]|1[0-2])\-0*([1-9]|[1-2][0-9]|3[01])/
    const createTimeResult = question.createAt.match(REGEX)
    const updateTimeResult = question.updateAt.match(REGEX)
    const createDate: string = createTimeResult
        ? `${createTimeResult[1]}年${createTimeResult[2]}月${createTimeResult[3]}日`
        : '読み込めませんでした'
    const updateDate: string = updateTimeResult
        ? `${updateTimeResult[1]}年${updateTimeResult[2]}月${updateTimeResult[3]}日`
        : '読み込めませんでした'
    const categoryTxt = question.category2 ? `${question.category1}、${question.category2}` : question.category1
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
        <VStack as="section" p="4" w="90%" border="1px" borderColor="gray.200" boxShadow="md" minH="300px">
            <HStack w="full">
                <Box as="figure" width="30px" height="30px">
                    <Avatar width="full" height="full" src={ICON_IMAGE_URL} />
                </Box>
                <VStack spacing="0px">
                    <Text fontWeight="400" w="full">
                        {question.postedBy}
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 0, md: '2' }}>
                        <Text fontWeight="400" fontSize="sm" color="gray.400">
                            作成日:{createDate}
                        </Text>
                        <Text fontWeight="400" fontSize="sm" color="gray.400">
                            更新日:{updateDate}
                        </Text>
                    </Stack>
                </VStack>
                <Spacer />
                <HStack>
                    <Text as="h2">{question.ansNum}</Text>
                    <Text>回答</Text>
                </HStack>
            </HStack>
            <Text fontSize="4xl" fontWeight="semibold" w="full">
                {question.title}
            </Text>
            <Text color="gray.400" w="full">
                {categoryTxt}
            </Text>
            <Text>{question.content}</Text>
            <QuestionImage />
            <Spacer />
            <HStack w="100%">
                <Spacer />
                <IconButton aria-label="通報する" icon={<NotAllowedIcon />} variant="outline"></IconButton>
            </HStack>
        </VStack>
    )
}
