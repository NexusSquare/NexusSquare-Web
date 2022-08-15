import { ReactNode } from 'react'
import DefaultFooter from './DefaultFooter'
import Layout from './Layout'

interface Props {
    children?: ReactNode
    pageName: string
}

const DefaultLayout: Function = ({ children, pageName }: Props): JSX.Element => {
    return (
        <Layout pageName={pageName}>
            {children}
            <DefaultFooter />
        </Layout>
    )
}
export default DefaultLayout
