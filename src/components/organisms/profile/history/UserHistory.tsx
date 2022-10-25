import {
    HStack,
    VStack,
    Text,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { LINKS } from '../../../../constants/links'
import { useFetchAnswersByUserId } from '../../../../hooks/answer/useFethcAnswer'
import { useFetchHistories } from '../../../../hooks/history/useFetchHistory'
import { useFetchQuestionsByUserId } from '../../../../hooks/question/useFetchQuestion'
import { History } from '../../../../types/domain/history'
import { Question } from '../../../../types/domain/qa'
import { Answer } from '../../../../types/domain/qa/Answer'
import { NoCards } from '../../../common/NoCards'
import { AnswerList } from './AnswerList'
import { HistoryList } from './HistoryList'
import { QuestionList } from './QuestionList'

interface Props {
    userId: string
    answers: Answer[]
    questions: Question[]
    isFetchLoading: boolean
    refetchQuestions: () => Promise<void>
}
// NOTE　責務を分離させるためにhooksの使用を許可
export const UserHistory = ({ userId, answers, questions, isFetchLoading, refetchQuestions }: Props) => {
    const { data: histories = [] } = useFetchHistories(userId)

    const router = useRouter()

    const onClickCard = (questionId: string) => {
        router.push(LINKS.QUESTION_DETAIL(questionId))
    }

    return (
        <>
            <Tabs w="100%" isLazy defaultIndex={1}>
                <TabList>
                    <Tab
                        w="full"
                        border="1px"
                        color="gray.400"
                        bgColor="gray.200"
                        borderRadius="sm"
                        fontSize={{ base: 'md', sm: 'xl' }}
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
                        borderRadius="sm"
                        fontSize={{ base: 'md', sm: 'xl' }}
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
                        borderRadius="sm"
                        fontSize={{ base: 'md', sm: 'xl' }}
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

                <TabPanels>
                    <TabPanel padding="0px">
                        <HistoryList historyList={histories} />
                    </TabPanel>
                    <TabPanel padding="0px">
                        <QuestionList
                            questions={questions}
                            isLoading={isFetchLoading}
                            onClickCard={onClickCard}
                            refetchQuestions={refetchQuestions}
                            userId={userId}
                        />
                    </TabPanel>
                    <TabPanel padding="0px">
                        <AnswerList answers={answers} isLoading={isFetchLoading} onClickCard={onClickCard} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
