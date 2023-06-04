import { BellIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Box,
    HStack,
    Text,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    VStack,
    Divider,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { Notification } from '../../../../entities/notification/Notification'
import { NotificationCardList } from './_NotificationCardList'
import { NotificationIconButton } from './_NotificationIconButton'

interface Props {
    notifications: Notification[]
    seeNotification: (notificationId: string, questionId: string) => void
}

export const NotificationPopover: FC<Props> = ({ notifications, seeNotification }) => {
    const onClickNotification = async (notificationId: string, questionId: string) => {
        seeNotification(notificationId, questionId)
    }

    const hasNotification = notifications.length > 0
    return (
        <Popover>
            <PopoverTrigger>
                <Box position="relative">
                    <NotificationIconButton />
                    {hasNotification && (
                        <Box
                            position="absolute"
                            bgColor="red"
                            borderRadius="50%"
                            boxSize="12px"
                            top="5px"
                            left="20px"
                            _hover={{ cursor: 'pointer' }}
                        ></Box>
                    )}
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    {hasNotification ? (
                        <NotificationCardList notifications={notifications} onClick={onClickNotification} />
                    ) : (
                        <HStack py="2" px="2">
                            <Text color="gray.600">通知がありません</Text>
                        </HStack>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
