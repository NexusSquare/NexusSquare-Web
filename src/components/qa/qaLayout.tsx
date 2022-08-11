import { HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Layout from '../common/Layout'
import QALeftBar from './QALeftBar'
import QARightBar from './QARightBar'

interface Props {
    children?: ReactNode
    pageName: string
}

const QALayout: Function = ({ children, pageName }: Props): JSX.Element => {
    return (
        <Layout pageName={pageName}>
            <HStack spacing="0px">
                <QALeftBar />
                {children}
                <QARightBar />
            </HStack>
        </Layout>
    )
}

export default QALayout
