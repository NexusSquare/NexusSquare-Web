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
import { createNotificationMessage } from '../../../../constants/notification'
import { Notification } from '../../../../entities/notification/Notification'
import { NotificationIconButton } from './_NotificationIconButton'

interface Props {
    notifications: Notification[]
    seeNotification: (notificationId: string, questionId: string) => void
}

export const NotificationPopover: FC<Props> = ({ notifications, seeNotification }) => {
    const onClickNotification = async (notificationId: string, questionId: string) => {
        seeNotification(notificationId, questionId)
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Box position="relative">
                    <NotificationIconButton />
                    <Box
                        position="absolute"
                        bgColor="red"
                        borderRadius="50%"
                        boxSize="12px"
                        top="5px"
                        left="20px"
                        _hover={{ cursor: 'pointer' }}
                    ></Box>
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    {notifications.map((notification: Notification, index: number) => {
                        return (
                            <Box key={notification.notificationId}>
                                <HStack
                                    py="2"
                                    px="2"
                                    _hover={{ bgColor: 'gray.100', cursor: 'pointer' }}
                                    w="full"
                                    onClick={() =>
                                        onClickNotification(notification.notificationId, notification.questionId)
                                    }
                                >
                                    <Avatar
                                        as="button"
                                        width="32px"
                                        height="32px"
                                        src={notification.imageUrl}
                                        bg="white"
                                        borderWidth={'1px'}
                                        borderColor={'gray.200'}
                                    />
                                    <VStack spacing={0} alignItems={'start'} w="full">
                                        <HStack w="full">
                                            <Text color={'gray.400'} fontSize={'sm'} w="full" textAlign={'start'}>
                                                {createNotificationMessage(notification.type, notification.nickname)}
                                            </Text>
                                        </HStack>
                                        <Text fontWeight={'bold'} fontSize={'sm'} noOfLines={1}>
                                            {notification.questionTitle}
                                        </Text>
                                    </VStack>
                                </HStack>

                                {index < notifications.length - 1 && <Divider />}
                            </Box>
                        )
                    })}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
