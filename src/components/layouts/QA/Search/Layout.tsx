import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CommonMeta from '../../CommonMeta'
import { Header } from '../../Header'
import { Footer } from '../../Footer'
import { LeftBar } from './LeftBar'
import { RightBar } from '../../RigthBar'
import { SortItem } from '../../../../constants/sort'
import { QACategory } from '../../../../constants/query'
import { QuestionStatus } from '../../../../constants/qa/status'

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
                <LeftBar sortQuestions={sortQuestions} filterQuestions={filterQuestions} questionNum={questionNum} />
                <VStack
                    w={{
                        base: '100%',
                        sm: '100vw',
                        md: 'calc(100vw - 240px)',
                        xl: 'calc(400px + 50vw)',
                    }}
                    paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
                    spacing={0}
                >
                    {children}
                    <Footer />
                </VStack>
                <RightBar />
            </HStack>
        </>
    )
}
