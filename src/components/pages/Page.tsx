import React from 'react'
import { TopAbout } from '../top/TopAbout'
import { TopButtonArea } from '../top/TopButtonArea'
import { TopFeature } from '../top/TopFeature'
import { TopInfo } from '../top/TopInfo'
import { TopSupporters } from '../top/TopSupporters '

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
