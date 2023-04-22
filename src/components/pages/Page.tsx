import React from 'react'
import { Footer } from '../layouts/Footer'
import { TopAbout } from '../ui/features/Top/TopAbout'
import { TopButtonArea } from '../ui/features/Top/TopButtonArea'
import { TopFeature } from '../ui/features/Top/TopFeature'
import { TopInfo } from '../ui/features/Top/TopInfo'
import { TopSupporters } from '../ui/features/Top/TopSupporters'

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
