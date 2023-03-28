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
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { useFetchAnswersByUserId } from '../../../../hooks/answer/useFethcAnswer'
import { useFetchHistories } from '../../../../hooks/history/useFetchHistory'
import { useFetchQuestionsByUserId } from '../../../../hooks/question/useFetchQuestion'
import { History } from '../../../../entities/history'
import { Question } from '../../../../entities/qa'
import { Answer } from '../../../../entities/qa/Answer'
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
    refetchAnswers: () => Promise<void>
}
// NOTE　責務を分離させるためにhooksの使用を許可
export const UserHistory = ({
    userId,
    answers,
    questions,
    isFetchLoading,
    refetchQuestions,
    refetchAnswers,
}: Props) => {
    const { data: histories = [] } = useFetchHistories(userId)

    const router = useRouter()

    const onClickCard = (postId: string) => {
        router.push(PAGE_LINKS.QA._QUESTIONS_ID(postId).URL)
    }

    return (
        <>
            <Tabs w="100%" isLazy defaultIndex={1}>
                <TabList>
                    <HistoryTab label="履歴" />
                    <HistoryTab label="質問" />
                    <HistoryTab label="回答" />
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
                        <AnswerList
                            answers={answers}
                            isLoading={isFetchLoading}
                            onClickCard={onClickCard}
                            userId={userId}
                            refetchAnswers={refetchAnswers}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

interface HistoryTabProps {
    label: string
}
const HistoryTab = ({ label }: HistoryTabProps) => {
    return (
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
            {label}
        </Tab>
    )
}
