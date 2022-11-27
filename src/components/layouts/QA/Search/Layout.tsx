import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../../CommonMeta'
import { Header } from '../../Header'
import { Footer } from '../../Footer'
import { RightBar } from '../../RigthBar'
import { SortItem } from '../../../../constants/sort'
import { QACategory } from '../../../../constants/query'
import { QuestionStatus } from '../../../../constants/qa/status'
import { MAIN_CONTENT_PADDING_LEFT, MAIN_CONTENT_WIDTH } from '../../constants'
import { SearchLeftBar } from './_SearchLeftBar'

interface Props {
    children?: ReactNode
    pageName: string
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    questionNum: number
}

export const Layout = ({ children, pageName, sortQuestions, filterQuestions, questionNum }: Props): JSX.Element => {
    const siteTitle: string = `nexussquare - ${pageName}`
    return (
        <>
            <CommonMeta siteTitle={siteTitle} />
            <Header />
            <HStack spacing="0px" paddingTop={{ base: '96px', md: '56px' }}>
                <SearchLeftBar
                    sortQuestions={sortQuestions}
                    filterQuestions={filterQuestions}
                    questionNum={questionNum}
                />
                <VStack w={MAIN_CONTENT_WIDTH} spacing={0} pl={MAIN_CONTENT_PADDING_LEFT}>
                    {children}
                    <Footer />
                </VStack>
                <RightBar />
            </HStack>
        </>
    )
}
