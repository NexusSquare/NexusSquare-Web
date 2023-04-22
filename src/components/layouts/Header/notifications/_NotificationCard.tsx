import { Avatar, HStack, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { createNotificationMessage } from '../../../../constants/notification'
import { Notification } from '../../../../entities/notification/Notification'
interface Props {
    notification: Notification
    onClick: () => void
}
export const NotificationCard = ({ notification, onClick }: Props) => {
    return (
        <HStack py="2" px="2" _hover={{ bgColor: 'gray.100', cursor: 'pointer' }} w="full" onClick={onClick}>
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
    )
}
