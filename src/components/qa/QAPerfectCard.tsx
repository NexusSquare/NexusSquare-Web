import { EditIcon, NotAllowedIcon, HamburgerIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    HStack,
    IconButton,
    Image,
    Menu,
    Spacer,
    Divider,
    Button,
    Stack,
    Text,
    VStack,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { BsChatText } from 'react-icons/bs'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Question } from '../../types/domain/qa'
import ChakraNextImage from '../common/chakraNextImage'

interface Props {
    question: Question
    onOpenEditForm: () => void
}

export const QAPerfectCard = ({ question, onOpenEditForm }: Props) => {
    const QA_IMAGE_PATH: string = '/images/ans.png'
    const REGEX: RegExp = /^([1-9][0-9]{3})\-0*([1-9]|1[0-2])\-0*([1-9]|[1-2][0-9]|3[01])/
    const result = question.createAt.toString().match(REGEX)
    const date: string = result ? result[1] + '年' + result[2] + '月' + result[3] + '日' : '読み込めませんでした'
    const categoryText: string = question.categories[1]
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
            w="100%"
            padding="10px 20px"
            border="1px"
            borderColor="gray.300"
            bgColor={'white'}
            spacing={2}
            alignItems={'start'}
        >
            <HStack justify={'space-between'} w="full">
                <HStack>
                    <Avatar width={8} height={8} src={question.postUser.imageUrl} />
                    <VStack spacing={0} alignItems={'start'}>
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
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HiDotsHorizontal />}
                        variant="outline"
                        border={'none'}
                    />
                    <MenuList>
                        <MenuItem icon={<EditIcon aria-label="編集する" />} onClick={onOpenEditForm}>
                            編集する
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon aria-label="削除する" />}>削除する</MenuItem>
                        <MenuItem icon={<NotAllowedIcon aria-label="通報する" />}>通報する</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Text as="h3" fontSize="xl" fontWeight="bold" isTruncated>
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

            <HStack alignSelf={'end'}>
                <ChakraNextImage src={QA_IMAGE_PATH} alt="回答数" width={25} height={25} minW="25px" minH="25px" />
                <Text>{question.ansNum}</Text>
            </HStack>
            {/* <QuestionImage />
             */}
            <Divider />
            <Button
                bgColor="mainColor"
                color="white"
                _hover={{ bgColor: 'subSubColor' }}
                leftIcon={<BsChatText size={16} />}
                w={{ base: 'full', md: '96' }}
                alignSelf={'center'}
            >
                回答する
            </Button>
        </VStack>
    )
}
