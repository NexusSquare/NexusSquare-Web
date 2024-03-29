import { DeleteIcon, EditIcon, NotAllowedIcon } from '@chakra-ui/icons'
import {
    Avatar,
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
import { BiMedal } from 'react-icons/bi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { convertDateToString } from '../../../lib/convert/convertTimestamp'
import { replaceLineFeed } from '../../../lib/replaceLineFeed'
import { useUser } from '../../../store/atom'
import { Answer } from '../../../entities/qa/Answer'

interface Props {
    isMine: boolean
    answer: Answer
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onClickCard: (value: string) => void
    onClickDetail: (value: Answer) => void
}

export const AnswerCard = ({
    isMine,
    answer,
    onOpenEditForm,
    onOpenDeleteForm,
    onClickCard,
    onClickDetail,
}: Props): JSX.Element => {
    const { user } = useUser()
    const userId = user?.userId
    const date = convertDateToString(answer.createdAt)
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
                    <Avatar width={8} height={8} src={answer.postUser.imageUrl} />
                    <VStack spacing={0} alignItems={'start'}>
                        <HStack>
                            <Text color="gray.400" isTruncated fontSize={'sm'}>
                                {answer.postUser.nickname}
                            </Text>
                            {!answer.postUser.isDepartmentAnonymous && (
                                <Text color="gray.400 " fontSize={'sm'}>
                                    {answer.postUser.subject}
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
                            onClick={() => onClickDetail(answer)}
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
                whiteSpace={'pre-line'}
            >
                {answer.content}
            </Text>
            {answer.isBest && (
                <HStack alignItems={'center'} alignSelf={'end'} color={'red.400'}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                        ベストアンサー
                    </Text>
                    <BiMedal size={30} />
                </HStack>
            )}
        </VStack>
    )
}
