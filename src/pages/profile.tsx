import { Box, Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import history from "../entity/history";

const Profile: NextPage = () => {
    const [histories,setHistories] = useState<history[]>([])
    const pointHistory = () => {
        return (
            <VStack>
                {
                    histories.map(
                        (history) => {
                            return(
                                <HStack>
                                    <Box></Box>
                                    <VStack>
                                        <Text>{history.createAt}</Text>
                                        <HStack>
                                            <Text>{history.history}</Text>
                                            <Text>+{history.point}pt</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            )
                        }
                    )
                }
            </VStack>
        )
    }
    return (
        <VStack>
            <HStack><Text color="#FF9037">◀︎ ホーム</Text></HStack>
            <HStack>
                <VStack>
                    <HStack>
                        <VStack>
                            <Text>みょうじ</Text>
                            <Text>苗字</Text>
                        </VStack>
                        <VStack>
                            <Text>たろう</Text>
                            <Text>太郎</Text>
                        </VStack>
                    </HStack>
                    <Text>学部学科</Text>
                </VStack>
                <Text>学年</Text>
            </HStack>
            <VStack>
                <Text>保有ポイント</Text>
                <HStack><Text>1500</Text><Text>pt</Text></HStack>
            </VStack>
            <Link href="/gift">
                <HStack>
                    <Text>応募する</Text>
                </HStack>
            </Link>
            <Tabs w="100%" isLazy defaultIndex={1}>
                <TabList>
                    <Tab w="33.3%" border="1px" color="#FF9037" bgColor="white" borderRadius="5px" fontSize="2xl" _selected={{ bgColor:"#FF9037",borderColor:"gray.400",color:"white" }} _active={{ outline:"none" }} _focus={{ outline: "none" }}>ポイント履歴</Tab>
                    <Tab w="33.4%" border="1px" color="#FF9037" bgColor="white" borderRadius="5px" fontSize="2xl" _selected={{ bgColor:"#FF9037",borderColor:"gray.400",color:"white" }} _active={{ outline:"none" }} _focus={{ outline: "none" }}>質問</Tab>
                    <Tab w="33.3%" border="1px" color="#FF9037" bgColor="white" borderRadius="5px" fontSize="2xl" _selected={{ bgColor:"#FF9037",borderColor:"gray.400",color:"white" }} _active={{ outline:"none" }} _focus={{ outline: "none" }}>回答</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel padding="0px"><VStack></VStack><Box w="100%" textAlign="center"><Button w="100%">さらに読み込む</Button></Box></TabPanel>
                    <TabPanel padding="0px"><VStack></VStack><Box w="100%" textAlign="center"><Button w="100%">さらに読み込む</Button></Box></TabPanel>
                    <TabPanel padding="0px"><VStack></VStack><Box w="100%" textAlign="center"><Button w="100%">さらに読み込む</Button></Box></TabPanel>
                </TabPanels>
        </Tabs>
        </VStack>
    )
}
export default Profile