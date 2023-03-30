import { DeleteIcon, EditIcon, NotAllowedIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Button,
    Divider,
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
import { useRouter } from 'next/router'
import { HiDotsHorizontal } from 'react-icons/hi'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { convertDateToString } from '../../../../lib/convert/convertTimestamp'
import { Answer } from '../../../../entities/qa/Answer'
import { BiMedal } from 'react-icons/bi'

interface Props {
    userId: string
    answer: Answer
    onOpenEditForm: () => void
    onOpenDeleteForm: () => void
    onOpenReportForm: () => void
    onClickDetail: (value: Answer) => void
    onOpenBestAnswerModal: (value: Answer) => void
    isMyQuestion: boolean
    bestAnswerId?: string
}

const AnswerCard = ({
    answer,
    userId,
    onOpenEditForm,
    onOpenDeleteForm,
    onClickDetail,
    onOpenBestAnswerModal,
    onOpenReportForm,
    isMyQuestion,
    bestAnswerId,
}: Props): JSX.Element => {
    const router = useRouter()
    const date = convertDateToString(answer.createdAt)
    const onClickUserInfo = () => {
        router.push(PAGE_LINKS.PROFILE._USER_ID(answer.userId).URL)
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
                    <Avatar
                        width={8}
                        height={8}
                        src={answer.postUser.imageUrl}
                        onClick={onClickUserInfo}
                        _hover={{ cursor: 'pointer' }}
                    />
                    <VStack spacing={0} alignItems={'start'} onClick={onClickUserInfo} _hover={{ cursor: 'pointer' }}>
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
                    <MenuList>
                        {userId === answer.userId ? (
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

            <Text width="100%" maxWidth="100%" minWidth="100%" overflowWrap="break-word">
                {answer.content}
            </Text>
            {isMyQuestion && !bestAnswerId && (
                <>
                    <Divider />
                    <Button
                        leftIcon={<BiMedal size={20} />}
                        rounded="sm"
                        size="xs"
                        alignSelf={'end'}
                        bg="white"
                        color="gray.400"
                        borderWidth={1}
                        onClick={() => onOpenBestAnswerModal(answer)}
                    >
                        ベストアンサーにする
                    </Button>
                </>
            )}
            {answer.answerId === bestAnswerId && (
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
export default AnswerCard
