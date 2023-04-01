import { useMutation, UseMutationOptions } from 'react-query'
import { userService } from '../../services/user/UserServiceImpl'

import { UserParams } from '../../entities/factories/userFactory'

export const usePostUser = (queryOptions?: UseMutationOptions) => {
    return useMutation((user: UserParams) => userService.save(user))
}
