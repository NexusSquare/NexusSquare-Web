import { DeleteIcon, EditIcon, NotAllowedIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { USER_ID } from '../../../constants/token'
import { useSession } from '../../../hooks/useSession'
import { convertTimestampToString } from '../../../lib/convert/convertTimestamp'
import { replaceLineFeed } from '../../../lib/replaceLineFeed'
import { Answer } from '../../../types/domain/qa/Answer'

interface Props {
    answer: Answer
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onClickCard: (value: string) => void
    onClickDetail: (value: Answer) => void
}

export const AnswerCard = ({
    answer,
    onOpenEditForm,
    onOpenDeleteForm,
    onClickCard,
    onClickDetail,
}: Props): JSX.Element => {
    const { value: userId } = useSession(USER_ID)
    const date = convertTimestampToString(answer.createAt)
    // const content = replaceLineFeed(answer.content)
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
                    <Avatar width={8} height={8} src={answer.postUser.imageUrl} />
                    <VStack spacing={0} alignItems={'start'}>
                        <HStack>
                            <Text color="gray.400" isTruncated>
                                {answer.postUser.nickname}
                            </Text>
                            {!answer.postUser.isDepartmentAnonymous && (
                                <Text color="gray.400">{answer.postUser.subject}</Text>
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
                        onClick={() => onClickDetail(answer)}
                    />
                    {userId === answer.userId && (
                        <MenuList>
                            <MenuItem icon={<EditIcon aria-label="編集する" />} onClick={onOpenEditForm}>
                                編集する
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon aria-label="削除する" />} onClick={onOpenDeleteForm}>
                                削除する
                            </MenuItem>
                        </MenuList>
                    )}
                </Menu>
            </HStack>
            <Text
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                noOfLines={1}
                onClick={() => onClickCard(answer.questionId)}
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                {answer.questionTitle}
            </Text>
            <Text
                width="100%"
                maxWidth="100%"
                minWidth="100%"
                overflowWrap="break-word"
                noOfLines={3}
                onClick={() => onClickCard(answer.questionId)}
                _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                {answer.content}
            </Text>
        </VStack>
    )
}
