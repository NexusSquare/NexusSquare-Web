import { Box, Button, ButtonGroup, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import QACard from './QACard'
import queryOptions from '../../constants/qa/queryOptions'
import QAQueryProps from '../../constants/qa/queryGroup'
import { Question } from '../../types/domain/qa'

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
                    borderRadius="5px"
                    fontSize={{ base: 'lg', sm: 'xl' }}
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
                    borderRadius="5px"
                    fontSize={{ base: 'lg', sm: 'xl' }}
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
                0
            ) : (
                <>
                    <TabPanels>
                        <TabPanel padding="0px">
                            {questions.map((question: Question) => {
                                return <QACard question={question} key={question.questionId} />
                            })}

                            <Box w="100%" textAlign="center">
                                <Button w="100%">さらに読み込む</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel padding="0px">
                            {questions.map((question: Question) => {
                                return <QACard question={question} key={question.questionId} />
                            })}
                        </TabPanel>
                    </TabPanels>
                </>
            )}
        </Tabs>
    )
}

export default React.memo(QACardListBox)
