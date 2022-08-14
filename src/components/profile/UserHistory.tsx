import { HStack, VStack, Text, TabList, Tabs, Tab, TabPanels, TabPanel, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { HistoryCard } from './HistoryCard'
import { HistoryList } from './HistoryList'
import History from '../../types/domain/account/History'

interface Props {
    history: History
}

export const UserHistory = ({ history }: Props) => {
    return (
        <>
            <Tabs w="100%" isLazy defaultIndex={1}>
                <TabList>
                    <Tab
                        w="33.3%"
                        border="1px"
                        color="#FF9037"
                        bgColor="white"
                        borderRadius="5px"
                        fontSize={{ base: 'md', md: '2xl' }}
                        _selected={{ bgColor: '#FF9037', borderColor: 'gray.400', color: 'white' }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        ポイント履歴
                    </Tab>
                    <Tab
                        w="33.4%"
                        border="1px"
                        color="#FF9037"
                        bgColor="white"
                        borderRadius="5px"
                        fontSize={{ base: 'md', md: '2xl' }}
                        _selected={{ bgColor: '#FF9037', borderColor: 'gray.400', color: 'white' }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        質問
                    </Tab>
                    <Tab
                        w="33.3%"
                        border="1px"
                        color="#FF9037"
                        bgColor="white"
                        borderRadius="5px"
                        fontSize={{ base: 'md', md: '2xl' }}
                        _selected={{ bgColor: '#FF9037', borderColor: 'gray.400', color: 'white' }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        回答
                    </Tab>
                </TabList>
                <HistoryList history={history} />
                <TabPanels>
                    <TabPanel padding="0px">
                        <VStack></VStack>
                        <Box w="100%" textAlign="center">
                            <Button w="100%">さらに読み込む</Button>
                        </Box>
                    </TabPanel>
                    <TabPanel padding="0px">
                        <VStack></VStack>
                        <Box w="100%" textAlign="center">
                            <Button w="100%">さらに読み込む</Button>
                        </Box>
                    </TabPanel>
                    <TabPanel padding="0px">
                        <VStack></VStack>
                        <Box w="100%" textAlign="center">
                            <Button w="100%">さらに読み込む</Button>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
