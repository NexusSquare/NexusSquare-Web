import { HStack, VStack, Text, TabList, Tabs, Tab, TabPanels, TabPanel, Box, Button } from '@chakra-ui/react'
import React from 'react'
import { HistoryCard } from './HistoryCard'
import { HistoryList } from './HistoryList'
import History from '../../types/domain/account/History'

interface Props {
    historyList: History[]
}

export const UserHistory = ({ historyList }: Props) => {
    return (
        <>
            <Tabs w="100%" isLazy defaultIndex={1}>
                <TabList>
                    <Tab
                        w="full"
                        border="1px"
                        color="gray.400"
                        bgColor="gray.200"
                        borderRadius="5px"
                        fontSize={{ base: 'lg', sm: 'xl' }}
                        _selected={{
                            bgColor: 'white',
                            borderColor: 'gray.400',
                            borderBottomColor: 'mainColor',
                            borderBottomWidth: '5px',
                            color: 'black',
                        }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        履歴
                    </Tab>
                    <Tab
                        w="full"
                        border="1px"
                        color="gray.400"
                        bgColor="gray.200"
                        borderRadius="5px"
                        fontSize={{ base: 'lg', sm: 'xl' }}
                        _selected={{
                            bgColor: 'white',
                            borderColor: 'gray.400',
                            borderBottomColor: 'mainColor',
                            borderBottomWidth: '5px',
                            color: 'black',
                        }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        質問
                    </Tab>
                    <Tab
                        w="full"
                        border="1px"
                        color="gray.400"
                        bgColor="gray.200"
                        borderRadius="5px"
                        fontSize={{ base: 'lg', sm: 'xl' }}
                        _selected={{
                            bgColor: 'white',
                            borderColor: 'gray.400',
                            borderBottomColor: 'mainColor',
                            borderBottomWidth: '5px',
                            color: 'black',
                        }}
                        _active={{ outline: 'none' }}
                        _focus={{ outline: 'none' }}
                    >
                        回答
                    </Tab>
                </TabList>
                <HistoryList historyList={historyList} />
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
