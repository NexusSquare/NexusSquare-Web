import { Box, Button, HStack, Spacer, Text, VStack, Avatar } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { LINKS } from '../../../constants/links'
import { convertTimestampToString } from '../../../lib/convert/convertTimestamp'
import { replaceLineFeed } from '../../../lib/replaceLineFeed'
import { Question } from '../../../types/domain/qa/Question'
import ChakraNextImage from '../../common/chakraNextImage'

interface Props {
    question: Question
}

const QACard = ({ question }: Props) => {
    const router = useRouter()
    const QA_IMAGE_PATH: string = '/images/ans.png'
    const date = convertTimestampToString(question.createAt)
    const content = replaceLineFeed(question.content)
    const categoryText: string = question.categories[1]
        ? `${question.categories[0]}、${question.categories[1]}`
        : question.categories[0]

    const onClickUserInfo = () => {
        router.push(LINKS.PROFILE(question.userId))
    }
    return (
        <Link href={'/qa/' + question.questionId} passHref>
            <Box as="a">
                <VStack
                    as="section"
                    w="100%"
                    padding="10px 20px"
                    border="1px"
                    borderColor="gray.300"
                    _hover={{ opacity: '50%' }}
                    bgColor={'white'}
                    spacing={2}
                    alignItems={'start'}
                >
                    <HStack>
                        <Avatar
                            width={8}
                            height={8}
                            src={question.postUser.imageUrl}
                            onClick={onClickUserInfo}
                            _hover={{ cursor: 'pointer' }}
                        />
                        <VStack
                            spacing={0}
                            alignItems={'start'}
                            onClick={onClickUserInfo}
                            _hover={{ cursor: 'pointer' }}
                        >
                            <HStack>
                                <Text color="gray.400" isTruncated>
                                    {question.postUser.nickname}
                                </Text>
                                {!question.postUser.isDepartmentAnonymous && (
                                    <Text color="gray.400">{question.postUser.subject}</Text>
                                )}
                            </HStack>

                            <Text color="gray.400" fontSize={'sm'}>
                                {date}
                            </Text>
                        </VStack>
                    </HStack>
                    <Text as="h3" fontSize="xl" fontWeight="bold" noOfLines={1}>
                        {question.title}
                    </Text>
                    <Text width="100%" maxWidth="100%" minWidth="100%" overflowWrap="break-word" noOfLines={3}>
                        {question.content}
                    </Text>
                    <HStack>
                        <AiOutlineTag color={'#a0acc0'} />
                        <Text color="gray.400" fontSize={'sm'}>
                            {categoryText}
                        </Text>
                    </HStack>

                    <HStack w="full" justifyContent={'end'}>
                        <ChakraNextImage
                            src={QA_IMAGE_PATH}
                            alt="回答数"
                            width={25}
                            height={25}
                            minW="25px"
                            minH="25px"
                        />
                        <Text>{question.ansNum}</Text>
                    </HStack>
                </VStack>
            </Box>
        </Link>
    )
}

export default memo(QACard)