import { BellIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { FC } from 'react'
import { NotificationIconButton } from './_NotificationIconButton'
import { NotificationPopover } from './_NotificationPopover'
import { Notification } from '../../../../entities/notification/Notification'

interface NotificationProps {
    notifications: Notification[]
    seeNotification: (notificationId: string, questionId: string) => void
}
export const NotificationButton: FC<NotificationProps> = ({ notifications, seeNotification }) =>
    notifications.length > 0 ? (
        <NotificationPopover notifications={notifications} seeNotification={seeNotification} />
    ) : (
        <NotificationIconButton />
    )
