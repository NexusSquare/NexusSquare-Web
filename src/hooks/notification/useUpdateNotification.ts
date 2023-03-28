import { useMutation, UseMutationOptions } from 'react-query'
import { notificationService } from '../../services/notificationService'

export const useUpdateNotification = (queryOptions?: UseMutationOptions) => {
    return useMutation((notificationId: string) => notificationService.update(notificationId))
}
