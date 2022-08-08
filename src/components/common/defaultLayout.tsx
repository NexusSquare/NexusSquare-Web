import { ReactNode } from 'react'
import DefaultFooter from './defaultFooter'
import Layout from './layout'

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
