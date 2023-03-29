import { useMutation, UseMutationOptions } from 'react-query'
import { userService } from '../../services/user/userService'
import { userMetaService } from '../../services/user/userMetaService'
import { UserReq } from '../../api/req/UserReq'
import { UserMetaReq } from '../../api/req'

export const usePostUser = (queryOptions?: UseMutationOptions) => {
    const userMutation = useMutation((user: UserReq) => userService.save(user))
    const userMetaMutation = useMutation((user: UserReq) => userMetaService.save(user))
    return [userMutation, userMetaMutation]
}
