import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import React from "react";

export const TopSupporters = () => {
  return (
    <VStack paddingY={"5%"} paddingX={{ base: "5%", md: "10%" }} spacing="30px">
      <Heading marginBottom='30px'> 協賛企業</Heading>
      <Stack direction={{base:'column',md:'row'}}>
        <Box w="200px" h="100px" bgColor="gray.200">
          企業のロゴ？
        </Box>
        <Box w="200px" h="100px" bgColor="gray.200">
          企業のロゴ？
        </Box>
        <Box w="200px" h="100px" bgColor="gray.200">
          企業のロゴ？
        </Box>
        <Box w="200px" h="100px" bgColor="gray.200">
          企業のロゴ？
        </Box>
        <Box w="200px" h="100px" bgColor="gray.200">
          企業のロゴ？
        </Box>
      </Stack>
    </VStack>
  );
};
