import { Box, Button, Tab, TabList, TabPanel, TabPanels, VStack, Tabs, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import QACard from '../../molecules/qa/QACard'
import { Question } from '../../../entities/qa'
import { QASkeleton } from '../../common/QASkeleton'
import { NoCards } from '../../common/NoCards'
import { STATUS } from '../../../constants/qa/status'

type QuestionStatus = keyof typeof STATUS

interface QASkeletonsProps {
    sheltonCount: number
}
const QASkeletons: FC<QASkeletonsProps> = ({ sheltonCount }) => {
    const _sequential = new Array(sheltonCount).fill(null).map((_, i) => i)
    return (
        <>
            {_sequential.map((index) => {
                return <QASkeleton key={index} />
            })}
        </>
    )
}

interface QuestionTabLabelProps {
    onClick: () => void
    labelName: string
}

const QuestionTabLabel: FC<QuestionTabLabelProps> = ({ onClick, labelName }) => {
    return (
        <Tab
            w="50%"
            border="1px"
            color="gray.400"
            bgColor="gray.200"
            borderRadius="sm"
            fontSize={{ base: 'md', sm: 'xl' }}
            onClick={onClick}
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
            {labelName}
        </Tab>
    )
}

interface QuestionTabItemProps {
    isLoading: boolean
    questions: Question[]
    scrollPage: () => void
}
const QuestionTabItem: FC<QuestionTabItemProps> = ({ isLoading, questions, scrollPage }) => {
    if (isLoading) return <QASkeletons sheltonCount={3} />
    if (questions.length === 0) return <NoCards text="質問が見つかりませんでした。" />
    return (
        <>
            {questions.map((question: Question) => {
                return <QACard question={question} key={question.questionId} />
            })}
            <Box w="100%" textAlign="center">
                <Button w="100%" onClick={scrollPage}>
                    さらに読み込む
                </Button>
            </Box>
        </>
    )
}

interface Props {
    questions: Question[]
    isLoading: boolean
    changeStatus: (value: QuestionStatus) => void
    scrollPage: () => void
}
const QACardListBox = ({ questions, isLoading, changeStatus, scrollPage }: Props): JSX.Element => {
    return (
        <Tabs w="100%" isLazy defaultIndex={1}>
            <TabList>
                <QuestionTabLabel labelName="解決済み" onClick={() => changeStatus(STATUS.SOLVED)} />
                <QuestionTabLabel labelName="回答募集中" onClick={() => changeStatus(STATUS.NOT_SOLVED)} />
            </TabList>
            <TabPanels>
                <TabPanel padding="0px">
                    <QuestionTabItem
                        questions={questions}
                        scrollPage={scrollPage}
                        isLoading={isLoading}
                    ></QuestionTabItem>
                </TabPanel>
                <TabPanel padding="0px">
                    <QuestionTabItem
                        questions={questions}
                        scrollPage={scrollPage}
                        isLoading={isLoading}
                    ></QuestionTabItem>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default React.memo(QACardListBox)
