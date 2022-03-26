import { HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import Layout from "../common/layout";
import QALeftBar from "./qaLeftBar";
import QaRightBar from "./qaRightBar";

interface Props{
    children?:ReactNode,
    pageName: string
}

const QALayout: Function = ({ children,pageName }: Props): JSX.Element => {
    return (
        <Layout pageName={pageName}>
            <HStack spacing="0px">
                <QALeftBar/>
                {children}
                <QaRightBar />
            </HStack>
        </Layout>
    )
}

export default QALayout