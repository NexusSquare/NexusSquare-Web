import { useMutation, UseMutationOptions } from 'react-query'
import { userService } from '../../services/user/userService'
import { UserReq } from '../../api/req/UserReq'

export const useUpdateUser = (queryOptions?: UseMutationOptions) => {
    return useMutation((user: Partial<UserReq>) => userService.update(user))
}
