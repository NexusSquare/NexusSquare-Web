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

interface Props {
    user: User
    userMeta: UserMeta
    seeProfile: () => void
    signOut: () => void
}

export const AvatarPopover = ({ user, userMeta, seeProfile, signOut }: Props) => {
    return (
        <Popover>
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
                    <HStack as="button" py="4" px="2" w="full" _hover={{ bgColor: 'gray.100' }} onClick={signOut}>
                        <VscSignOut />
                        <Text>サインアウト</Text>
                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
