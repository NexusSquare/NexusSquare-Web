import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { Loading } from '../components/common/Loading'
import { LINKS } from '../constants/links'
import { useAuth } from '../hooks/authentication'
import { useUser } from '../store/atom'

type Props = {
    children: ReactNode
}

export const UserGuards = ({ children }: Props) => {
    const { user } = useUser()
    const router = useRouter()
    const isReady = router.isReady

    if (!isReady) return <Loading />

    if (!user && router.pathname !== LINKS.LOGIN) {
        router.push(LINKS.LOGIN)
    }

    return <>{children}</>
}
