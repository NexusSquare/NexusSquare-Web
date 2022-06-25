import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ChakraNextImage from "../common/chakraNextImage";

export const TopInfo = () => {
  const TOP_INFO_URL: string = "/images/ui_img.png";

  return (
    <Box paddingY={'5%'} paddingX={{ base: "5%", md: "10%" }} bgColor='subColor' background={'linear-gradient(0deg, transparent calc(10vw - 1px), #FBF6F0  10vw, white 100%)'}>
      <Stack direction={{ base: "column-reverse", md: "row" }} spacing="50px" >
        <HStack w={{ base: "100%", md: "50%" }}>
          <VStack align="start" spacing="30px">
            <Heading lineHeight="150%" fontSize={{ base: "3xl", md: "4xl" }} >
              <Box borderBottom="2px solid" as='span' borderColor='mainColor' >
                大学生活でわからないことがあるときはここで解決！
              </Box>
            </Heading >
            <Text lineHeight="200%">
              Nexus Squareは、県大生が作った県大生のための情報共有サービスです。
              「この教養の授業気になるけど内容が分からないから教えてほしい！」などの疑問を県大の学生に相談しましょう!
            </Text>
            <Button
              size="lg"
              color="mainColor"
              bgColor="white"
              borderWidth={1}
              borderColor="mainColor"
              _hover={{bgColor:"mainColor",color:'white'}}
              w={{base:'full',md:'auto'}}
            >
              新規登録 / ログイン
            </Button>
          </VStack>
        </HStack>
        <VStack w={{ base: "100%", md: "50%" }} justifyContent="center">
          <ChakraNextImage
            src={TOP_INFO_URL}
            alt="サービスの画像"
            width={500}
            height={500}
          />
        </VStack>
      </Stack>
    </Box>
  );
};
