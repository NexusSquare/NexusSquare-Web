import { Box, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { ReactNode, useState } from "react";
import QAFooter from "./qaFooter";
import Layout from "../common/layout";
import QACardListBox from "./qaCardList";
import QACardWindow from "./qaCardWindow";
import QALayout from "./qaLayout";
import QALeftBar from "./qaLeftBar";
import QaRightBar from "./qaRightBar";
import question from "../../entity/qa/question";

interface Props{
    children?: ReactNode,
    pageName: string
    data: question[]
}

const QAListLayout: Function = ({ children,pageName,data }: Props): JSX.Element => {
    return (
        <QALayout pageName={pageName}>
            <VStack w={{ base:"100%",sm:"100vw",md:"calc(100vw - 270px)",lg:"calc(100vw - 210px)" ,"xl":"calc(400px + 50vw)" }} paddingLeft={{base:"0",sm:"60px",md:"calc((100vw - 800px) / 2)"}} >
                <QACardWindow>
                    {children}
                    <QACardListBox data={data} />
                </QACardWindow>
                <QAFooter />
            </VStack>
        </QALayout>
    )
}

export default QAListLayout