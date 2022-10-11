import {
    Box,
    Button,
    SkeletonCircle,
    SkeletonText,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    VStack,
    Tabs,
    HStack,
    Text,
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import QACard from './QACard'
import queryOptions from '../../constants/qa/queryOptions'
import QAQueryProps from '../../constants/qa/queryGroup'
import { Question } from '../../types/domain/qa'
import { BsChatText } from 'react-icons/bs'
import { QASkeleton } from '../common/QASkeleton'
import { NoCards } from '../common/NoCards'

interface Props {
    query?: QAQueryProps
    questions: Question[]
    isLoading: boolean
}
type queryOptionType = typeof queryOptions
type queryOptions = typeof queryOptions[keyof queryOptionType]

const QACardListBox = ({ query, questions, isLoading }: Props): JSX.Element => {
    const [queryOption, setQueryOption] = useState<queryOptions>(queryOptions.notSolved)
    console.log(questions)
    const onNotSolvedClickHandler = () => {
        setQueryOption(queryOptions.notSolved)
    }
    const onSolvedClickHandler = () => {
        setQueryOption(queryOptions.solved)
    }

    return (
        <Tabs w="100%" isLazy defaultIndex={1}>
            <TabList>
                <Tab
                    w="50%"
                    border="1px"
                    color="gray.400"
                    bgColor="gray.200"
                    borderRadius="sm"
                    fontSize={{ base: 'md', sm: 'xl' }}
                    onClick={onSolvedClickHandler}
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
                    解決済み
                </Tab>
                <Tab
                    w="50%"
                    border="1px"
                    color="gray.400"
                    bgColor="gray.200"
                    borderRadius="sm"
                    fontSize={{ base: 'md', sm: 'xl' }}
                    onClick={onNotSolvedClickHandler}
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
                    回答募集中
                </Tab>
            </TabList>

            {isLoading ? (
                [1, 2, 3].map((index) => {
                    return <QASkeleton key={index} />
                })
            ) : (
                <>
                    <TabPanels>
                        <TabPanel padding="0px">
                            {questions.length > 0 ? (
                                <>
                                    {questions.map((question: Question) => {
                                        return <QACard question={question} key={question.questionId} />
                                    })}
                                    <Box w="100%" textAlign="center">
                                        <Button w="100%">さらに読み込む</Button>
                                    </Box>
                                </>
                            ) : (
                                <NoCards text="質問が見つかりませんでした。" />
                            )}
                        </TabPanel>
                        <TabPanel padding="0px">
                            {questions.length > 0 ? (
                                <>
                                    {questions.map((question: Question) => {
                                        return <QACard question={question} key={question.questionId} />
                                    })}
                                    <Box w="100%" textAlign="center">
                                        <Button w="100%">さらに読み込む</Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <HStack justify={'center'} py="4" h="50vh">
                                        <VStack>
                                            <BsChatText color={'#a0acc0'} size={100} />
                                            <Text color="gray.400">質問が見つかりませんでした。</Text>
                                        </VStack>
                                    </HStack>
                                </>
                            )}
                        </TabPanel>
                    </TabPanels>
                </>
            )}
        </Tabs>
    )
}

export default React.memo(QACardListBox)
