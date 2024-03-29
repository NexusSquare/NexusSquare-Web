import { EditIcon, NotAllowedIcon, HamburgerIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Avatar,
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
import { convertDateToString } from '../../../lib/convert/convertTimestamp'
import { useUser } from '../../../store/atom'
import { Question } from '../../../entities/qa'
import ChakraNextImage from '../../ui/common/chakraNextImage'

interface Props {
    isMine: boolean
    question: Question
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onClickCard: (value: string) => void
    onClickDetail: (value: Question) => void
}

export const QuestionCard = ({
    isMine,
    question,
    onOpenEditForm,
    onOpenDeleteForm,
    onClickCard,
    onClickDetail,
}: Props) => {
    const QA_IMAGE_PATH: string = '/images/ans.png'
    const date = convertDateToString(question.createdAt)
    const categoryText: string = question.categories[1]
        ? `${question.categories[0]}、${question.categories[1]}`
        : question.categories[0]
    return (
        <VStack
            as="section"
            w="100%"
            padding="10px 20px"
            border="1px"
            borderColor="gray.300"
            bgColor={'white'}
            spacing={1}
            alignItems={'start'}
        >
            <HStack justify={'space-between'} w="full">
                <HStack>
                    <Avatar width={8} height={8} src={question.postUser.imageUrl} />
                    <VStack spacing={0} alignItems={'start'}>
                        <HStack>
                            <Text color="gray.400" isTruncated fontSize={'sm'}>
                                {question.postUser.nickname}
                            </Text>
                            {!question.postUser.isDepartmentAnonymous && (
                                <Text color="gray.400" fontSize={'sm'}>
                                    {question.postUser.subject}
                                </Text>
                            )}
                        </HStack>

                        <Text color="gray.400" fontSize={'sm'}>
                            {date}
                        </Text>
                    </VStack>
                </HStack>
                {isMine && (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HiDotsHorizontal />}
                            variant="outline"
                            border={'none'}
                            onClick={() => onClickDetail(question)}
                        />
                        <MenuList>
                            <MenuItem icon={<EditIcon aria-label="編集する" />} onClick={onOpenEditForm}>
                                編集する
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon aria-label="削除する" />} onClick={onOpenDeleteForm}>
                                削除する
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </HStack>
            <Text
                as="h3"
                fontSize="lg"
                fontWeight="bold"
                noOfLines={1}
                onClick={() => onClickCard(question.questionId)}
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                {question.title}
            </Text>
            <Text
                width="100%"
                maxWidth="100%"
                minWidth="100%"
                overflowWrap="break-word"
                noOfLines={3}
                onClick={() => onClickCard(question.questionId)}
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                whiteSpace={'pre-line'}
            >
                {question.content}
            </Text>
            <HStack>
                <AiOutlineTag color={'#a0acc0'} />
                <Text color="gray.400" fontSize={'xs'}>
                    {categoryText}
                </Text>
            </HStack>

            <HStack w="full" justify={'end'}>
                <ChakraNextImage src={QA_IMAGE_PATH} alt="回答数" width={25} height={25} minW="25px" minH="25px" />
                <Text>{question.ansNum}</Text>
            </HStack>
        </VStack>
    )
}
