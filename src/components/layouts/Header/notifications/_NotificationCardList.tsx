import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { NotificationCard } from './_NotificationCard'
import { Notification } from '../../../../entities/notification/Notification'

interface Props {
    notifications: Notification[]
    onClick: (notificationId: string, questionId: string) => void
}
export const NotificationCardList = ({ notifications, onClick }: Props) => {
    return (
        <>
            {notifications.map((notification: Notification, index: number) => {
                return (
                    <Box key={notification.notificationId}>
                        <NotificationCard
                            notification={notification}
                            onClick={() => onClick(notification.notificationId, notification.questionId)}
                        />
                        {index < notifications.length - 1 && <Divider />}
                    </Box>
                )
            })}
        </>
    )
}
