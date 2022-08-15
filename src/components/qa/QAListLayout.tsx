import { Box, HStack, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ReactNode, useState } from 'react'
import QAFooter from './QAFooter'
import Layout from '../common/Layout'
import QACardListBox from './QACardList'
import QACardWindow from './QACardWindow'
import QALayout from './QALayout'
import QALeftBar from './QALeftBar'
import QaRightBar from './QARightBar'
import Question from '../../types/domain/qa/Question'
import QAQueryProps from '../../groupObject/qa/queryGroup'

interface Props {
    children?: ReactNode
    pageName: string
    data: Question[]
    query?: QAQueryProps
}

const QAListLayout: Function = ({ children, pageName, data, query }: Props): JSX.Element => {
    return (
        <QALayout pageName={pageName}>
            <VStack
                w={{
                    base: '100%',
                    sm: '100vw',
                    md: 'calc(100vw - 210px)',
                    lg: 'calc(100vw - 210px)',
                    xl: 'calc(400px + 50vw)',
                }}
                paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
            >
                <QACardWindow>
                    {children}
                    <QACardListBox data={data} query={query} />
                </QACardWindow>
                <QAFooter />
            </VStack>
        </QALayout>
    )
}

export default QAListLayout
