import React from 'react'
import { Footer } from '../layouts/Footer'
import { TopAbout } from '../organisms/top/TopAbout'
import { TopButtonArea } from '../organisms/top/TopButtonArea'
import { TopFeature } from '../organisms/top/TopFeature'
import { TopInfo } from '../organisms/top/TopInfo'
import { TopSupporters } from '../organisms/top/TopSupporters'

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
