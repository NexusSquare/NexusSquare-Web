import {
    Avatar,
    HStack,
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    VStack,
    Text,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Divider,
} from '@chakra-ui/react'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { VscSignOut } from 'react-icons/vsc'
import { User, UserMeta } from '../../../entities/user'
import { AiOutlineMail } from 'react-icons/ai'
interface Props {
    user: User
    userMeta: UserMeta
    seeProfile: () => void
    signOut: () => void
}

export const AvatarPopover = ({ user, userMeta, seeProfile, signOut }: Props) => {
    return (
        <Popover placement="bottom-start">
            <PopoverTrigger>
                <Avatar as="button" width="40px" height="40px" src={user.imageUrl} bg="mainColor" />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                    <HStack py="4" px="2" spacing="4">
                        <Avatar
                            as="button"
                            width="32px"
                            height="32px"
                            src={user.imageUrl}
                            bg="white"
                            borderWidth={'1px'}
                            borderColor={'gray.200'}
                            onClick={seeProfile}
                        />
                        <VStack w="full" alignItems={'left'} spacing="0">
                            <Text>{userMeta?.name}</Text>
                            <Text fontSize={'xs'}>{userMeta?.email}</Text>
                        </VStack>
                    </HStack>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <HStack as="button" py="4" px="2" w="full" _hover={{ bgColor: 'gray.100' }} onClick={seeProfile}>
                        <FiEdit />
                        <Text>プロフィール</Text>
                    </HStack>
                    <Divider />
                    <HStack
                        as="a"
                        py="4"
                        px="2"
                        w="full"
                        _hover={{ bgColor: 'gray.100', cursor: 'pointer' }}
                        target="_blank"
                        href="https://docs.google.com/forms/d/e/1FAIpQLScSjafjOyw_kakr15Ye9H8_bY9fBBcj76VOxQC6QrjwPM9vnw/viewform"
                    >
                        <AiOutlineMail />
                        <Text>お問い合わせ</Text>
                    </HStack>
                    <Divider />
                    <HStack as="button" py="4" px="2" w="full" _hover={{ bgColor: 'gray.100' }} onClick={signOut}>
                        <VscSignOut />
                        <Text>サインアウト</Text>
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
