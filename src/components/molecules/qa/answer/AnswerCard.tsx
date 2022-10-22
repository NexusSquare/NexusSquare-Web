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
import { useRouter } from 'next/router'
import { HiDotsHorizontal } from 'react-icons/hi'
import { LINKS } from '../../../../constants/links'
import { USER_ID } from '../../../../constants/token'
import { useSession } from '../../../../hooks/useSession'
import { convertTimestampToString } from '../../../../lib/convert/convertTimestamp'
import { Answer } from '../../../../types/domain/qa/Answer'

interface Props {
    answer: Answer
}

const AnswerCard = ({ answer }: Props): JSX.Element => {
    const { value: userId } = useSession(USER_ID)
    const router = useRouter()
    const date = convertTimestampToString(answer.createAt)
    const onClickUserInfo = () => {
        router.push(LINKS.PROFILE(answer.userId))
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
                    />
                    <MenuList>
                        {userId === answer.userId ? (
                            <>
                                <MenuItem icon={<EditIcon aria-label="編集する" />}>編集する</MenuItem>
                                <MenuItem icon={<DeleteIcon aria-label="削除する" />}>削除する</MenuItem>
                            </>
                        ) : (
                            <MenuItem icon={<NotAllowedIcon aria-label="通報する" />}>通報する</MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </HStack>

            <Text width="100%" maxWidth="100%" minWidth="100%" overflowWrap="break-word">
                {answer.content}
            </Text>
        </VStack>
    )
}
export default AnswerCard
