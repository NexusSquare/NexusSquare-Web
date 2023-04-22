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
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { useFetchAnswersByUserId } from '../../../hooks/answer/useFethcAnswer'
import { useFetchHistories } from '../../../hooks/history/useFetchHistory'
import { useFetchQuestionsByUserId } from '../../../hooks/question/useFetchQuestion'
import { History } from '../../../entities/history'
import { Question } from '../../../entities/qa'
import { Answer } from '../../../entities/qa/Answer'
import { NoCards } from '../../common/NoCards'
import { AnswerList } from './_AnswerList'
import { HistoryList } from './_HistoryList'
import { QuestionList } from './_QuestionList'
import { Refetch } from '../../../hooks/react-query/type'
import { pagesPath } from '../../../lib/$path'

interface Props {
    isMine: boolean
    userId: string
    answers: Answer[]
    questions: Question[]
    isFetchLoading: boolean
    refetchQuestions: Refetch<Question[]>
    refetchAnswers: Refetch<Answer[]>
    defaultTab?: string
}
// NOTE　責務を分離させるためにhooksの使用を許可
export const UserHistory = ({
    isMine,
    userId,
    answers,
    questions,
    isFetchLoading,
    refetchQuestions,
    refetchAnswers,
    defaultTab,
}: Props) => {
    const { data: histories = [] } = useFetchHistories(userId)

    const router = useRouter()

    const onClickCard = (postId: string) => {
        router.push(pagesPath.qa._id(postId).$url())
    }
    const onClickTab = (query: string) => {
        router.push(
            pagesPath.profile._id(userId).$url({
                query: {
                    tab: query,
                },
            })
        )
    }
    const convertIndex = (tab?: string) => {
        switch (tab) {
            case 'history':
                return 0
            case 'question':
                return 1
            case 'answer':
                return 2
            default:
                return 1
        }
    }
    return (
        <>
            <Tabs w="100%" isLazy defaultIndex={convertIndex(defaultTab)}>
                <TabList>
                    <HistoryTab label="履歴" onClick={() => onClickTab('history')} />
                    <HistoryTab label="質問" onClick={() => onClickTab('question')} />
                    <HistoryTab label="回答" onClick={() => onClickTab('answer')} />
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
                            isMine={isMine}
                        />
                    </TabPanel>
                    <TabPanel padding="0px">
                        <AnswerList
                            answers={answers}
                            isLoading={isFetchLoading}
                            onClickCard={onClickCard}
                            userId={userId}
                            refetchAnswers={refetchAnswers}
                            isMine={isMine}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

interface HistoryTabProps {
    label: string
    onClick: () => void
}
const HistoryTab = ({ label, onClick }: HistoryTabProps) => {
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
                borderBottomColor: 'primary',
                borderBottomWidth: '5px',
                color: 'black',
            }}
            _active={{ outline: 'none' }}
            _focus={{ outline: 'none' }}
            onClick={onClick}
        >
            {label}
        </Tab>
    )
}
