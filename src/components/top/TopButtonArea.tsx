import { VStack, Text, Heading } from "@chakra-ui/react";
import React from "react";
import QaButton from "../qa/qaButton";

export const TopButtonArea = () => {
  return (
    <VStack paddingY={"5%"} paddingX={{ base: "5%", md: "10%" }} spacing="30px">
        <Heading borderBottom="2px solid" borderColor='mainColor'>ネクスクに投稿しよう!</Heading>
        <QaButton/>
    </VStack>
  );
};
