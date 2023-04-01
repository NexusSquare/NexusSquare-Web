import { useRouter } from 'next/router'
import path from 'path'
import React, { ReactNode, useEffect } from 'react'
import { Loading } from '../components/common/Loading'
import { PAGE_LINKS } from '../constants/pageLinks'
import { useAuth } from '../hooks/authentication'
import { pagesPath } from '../lib/$path'

type Props = {
    children: ReactNode
}

export const UserGuards = ({ children }: Props) => {
    const { data: user, isLoading } = useAuth()
    const router = useRouter()
    const isReady = router.isReady

    if (!isReady || isLoading) return <Loading />

    if (user === null && router.pathname !== pagesPath.login.$url().pathname) {
        router.push(pagesPath.login.$url())
        return null
    }

    return <>{children}</>
}
