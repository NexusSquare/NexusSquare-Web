import React from 'react'
import { Footer } from '../layouts/Footer'
import { TopAbout } from '../ui/features/top/TopAbout'
import { TopButtonArea } from '../ui/features/top/TopButtonArea'
import { TopFeature } from '../ui/features/top/TopFeature'
import { TopInfo } from '../ui/features/top/TopInfo'
import { TopSupporters } from '../ui/features/top/TopSupporters'

export const HomePage = (): JSX.Element => {
    return (
        <>
            <TopInfo />
            <TopAbout />
            <TopFeature />
            <TopButtonArea />
            <TopSupporters />
        </>
    )
}
