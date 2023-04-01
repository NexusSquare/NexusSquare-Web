import { useMutation, UseMutationOptions } from 'react-query'
import { UserReq } from '../../api/req/UserReq'
import { userService } from '../../services/user/UserServiceImpl'

export const useUpdateUser = (queryOptions?: UseMutationOptions) => {
    return useMutation((user: Partial<UserReq>) => userService.update(user))
}
