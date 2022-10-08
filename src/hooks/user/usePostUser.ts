import { useMutation, UseMutationOptions } from 'react-query'
import { userService } from '../../services/userService'
import { userMetaService } from '../../services/userMetaService'
import { UserReq } from '../../types/api/req/UserReq'
import { UserMetaReq } from '../../types/api/req'

export const usePostUser = (queryOptions?: UseMutationOptions) => {
    const userMutation = useMutation((user: UserReq) => userService.save(user))
    const userMetaMutation = useMutation((user: UserReq) => userMetaService.save(user))
    return [userMutation, userMetaMutation]
}
