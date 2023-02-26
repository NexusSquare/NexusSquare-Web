import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { Loading } from '../components/common/Loading'
import { PAGE_LINKS } from '../constants/pageLinks'
import { useAuth } from '../hooks/authentication'

type Props = {
    children: ReactNode
}

export const UserGuards = ({ children }: Props) => {
    const { data: user, isLoading } = useAuth()
    const router = useRouter()
    const isReady = router.isReady

    if (!isReady || isLoading) return <Loading />

    if (!user && router.pathname !== PAGE_LINKS.LOGIN.URL) {
        router.push(PAGE_LINKS.LOGIN.URL)
    }

    return <>{children}</>
}
