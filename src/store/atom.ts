import { atom, useRecoilState } from 'recoil'
import { User, UserMeta } from '../../entities/user'

export const userState = atom<User | undefined>({
    key: 'userState',
    default: undefined,
})

export const userMetaState = atom<UserMeta | undefined>({
    key: 'userMetaState',
    default: undefined,
})

type UseUserType = {
    user: User | undefined
    setUser: (user: User | undefined) => void
}
type UseUserMetaType = {
    userMeta: UserMeta | undefined
    setUserMeta: (user: UserMeta | undefined) => void
}

export const useUser = (): UseUserType => {
    const [user, setUser] = useRecoilState(userState)

    return { user, setUser }
}
export const useUserMeta = (): UseUserMetaType => {
    const [userMeta, setUserMeta] = useRecoilState(userMetaState)

    return { userMeta, setUserMeta }
}
