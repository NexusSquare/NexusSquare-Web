import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Loading } from '../components/common/Loading'
import { LINKS } from '../constants/links'
import { useUser } from '../store/atom'

type Props = {
    children: ReactNode
}

export const UserGuards = ({ children }: Props) => {
    const { user } = useUser()
    const router = useRouter()

    if (!user && router.pathname !== LINKS.LOGIN) {
        router.push(LINKS.LOGIN)
        return <Loading />
    }
    return <>{children}</>
}
