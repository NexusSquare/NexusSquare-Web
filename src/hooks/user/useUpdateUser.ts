import { useMutation, UseMutationOptions } from 'react-query'
import { userService } from '../../services/userService'
import UserReq from '../../types/api/req/userReq'

export const useUpdateUser = (queryOptions?: UseMutationOptions) => {
    return useMutation((user: Partial<UserReq>) => userService.update(user))
}
