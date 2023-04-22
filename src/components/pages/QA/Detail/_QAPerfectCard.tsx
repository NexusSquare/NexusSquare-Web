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
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { AiOutlineTag } from 'react-icons/ai'
import { BsChatText } from 'react-icons/bs'
import { HiDotsHorizontal } from 'react-icons/hi'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { convertDateToString } from '../../../../lib/convert/convertTimestamp'
import { Question } from '../../../../entities/qa'
import ChakraNextImage from '../../../ui/common/chakraNextImage'
import { QuestionStatus } from '../../../../entities/qa/QuestionStatus'

interface Props {
    question: Question
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onOpenReportForm: () => void
    onOpenPostForm: () => void
    isPosted: boolean
    isMine: boolean
    questionCount: number
}

export const QAPerfectCard = ({
    question,
    onOpenEditForm,
    onOpenDeleteForm,
    onOpenReportForm,
    onOpenPostForm,
    isPosted,
    isMine,
    questionCount,
}: Props) => {
    const router = useRouter()
    const date = convertDateToString(question.createdAt)
    const categoryText: string = question.categories[1]
        ? `${question.categories[0]}、${question.categories[1]}`
        : question.categories[0]

    const onClickUserInfo = () => {
        router.push(PAGE_LINKS.PROFILE._USER_ID(question.userId).URL)
    }

    const canPost = question.status === QuestionStatus.OPEN && !isPosted && !isMine

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
                    <Avatar
                        width={8}
                        height={8}
                        src={question.postUser.imageUrl}
                        onClick={onClickUserInfo}
                        _hover={{ cursor: 'pointer' }}
                    />
                    <VStack spacing={0} alignItems={'start'}>
                        <HStack onClick={onClickUserInfo} _hover={{ cursor: 'pointer' }}>
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
                        {isMine ? (
                            <>
                                <MenuItem icon={<EditIcon aria-label="編集する" />} onClick={onOpenEditForm}>
                                    編集する
                                </MenuItem>
                                <MenuItem icon={<DeleteIcon aria-label="削除する" />} onClick={onOpenDeleteForm}>
                                    削除する
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem icon={<NotAllowedIcon aria-label="通報する" />} onClick={onOpenReportForm}>
                                通報する
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </HStack>
            <Text as="h3" fontSize="xl" fontWeight="bold">
                {question.title}
            </Text>
            <Text width="100%" maxWidth="100%" minWidth="100%" overflowWrap="break-word" whiteSpace={'pre-line'}>
                {question.content}
            </Text>
            <HStack>
                <AiOutlineTag color={'#a0acc0'} />
                <Text color="gray.400" fontSize={'sm'}>
                    {categoryText}
                </Text>
            </HStack>
            <CardFooter ansNum={questionCount} />
            {canPost && (
                <>
                    <Divider />
                    <AnswerButton onClick={onOpenPostForm} />
                </>
            )}
        </VStack>
    )
}

interface CardFooterProps {
    ansNum: number
}

const CardFooter: FC<CardFooterProps> = ({ ansNum }) => {
    const QA_IMAGE_PATH: string = '/images/ans.png'
    return (
        <HStack w="full" justify={'end'}>
            <ChakraNextImage src={QA_IMAGE_PATH} alt="回答数" width={25} height={25} minW="25px" minH="25px" />
            <Text>{ansNum}</Text>
        </HStack>
    )
}

interface AnswerButtonProps {
    onClick: () => void
}
const AnswerButton: FC<AnswerButtonProps> = ({ onClick }) => {
    return (
        <Button
            bg="white"
            borderWidth={1}
            borderColor="gray.300"
            leftIcon={<BsChatText size={16} />}
            w={{ base: 'full', md: '96' }}
            alignSelf={'center'}
            onClick={onClick}
            borderRadius="sm"
        >
            回答する
        </Button>
    )
}
