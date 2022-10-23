import React from 'react'
import { TopAbout } from '../organisms/top/TopAbout'
import { TopButtonArea } from '../organisms/top/TopButtonArea'
import { TopFeature } from '../organisms/top/TopFeature'
import { TopInfo } from '../organisms/top/TopInfo'
import { TopSupporters } from '../organisms/top/TopSupporters'

export const Page = (): JSX.Element => {
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
