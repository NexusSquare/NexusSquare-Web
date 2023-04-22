import { Button, Tab, TabList, TabPanel, TabPanels, VStack, Tabs, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import QACard from '../../ui/features/QA/QACard'
import { Question } from '../../../entities/qa'
import { QASkeleton } from '../../ui/features/QASkeleton'
import { NoCards } from '../../ui/common/NoCards'

import { Status } from '../../../constants/query'
import { QuestionType } from '../../../constants/qa/status'

interface Props {
    questions: Question[]
    isLoading: boolean
    changeStatus: (value: QuestionType) => void
    initStatus: Status
}
const QACardListBox = ({ questions, isLoading, changeStatus, initStatus }: Props): JSX.Element => {
    const defaultIndex = initStatus === QuestionType.SOLVED ? 0 : 1

    return (
        <Tabs w="100%" isLazy defaultIndex={defaultIndex}>
            <TabList>
                <QuestionTabLabel labelName="解決済み" onClick={() => changeStatus(QuestionType.SOLVED)} />
                <QuestionTabLabel labelName="回答募集中" onClick={() => changeStatus(QuestionType.NOT_SOLVED)} />
            </TabList>
            <TabPanels>
                <TabPanel padding="0px">
                    <QuestionTabItem questions={questions} isLoading={isLoading}></QuestionTabItem>
                </TabPanel>
                <TabPanel padding="0px">
                    <QuestionTabItem questions={questions} isLoading={isLoading}></QuestionTabItem>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

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
                borderBottomColor: 'primary',
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

interface QuestionListProps {
    questions: Question[]
}

const QuestionList = ({ questions }: QuestionListProps) => {
    return (
        <>
            {questions.map((question: Question) => {
                return <QACard question={question} key={question.questionId} />
            })}
        </>
    )
}

interface QuestionTabItemProps {
    isLoading: boolean
    questions: Question[]
}
const QuestionTabItem: FC<QuestionTabItemProps> = ({ isLoading, questions }) => {
    if (isLoading) return <QASkeletons sheltonCount={3} />
    if (questions.length === 0) return <NoCards text="質問が見つかりませんでした。" />
    return <QuestionList questions={questions} />
}

export default React.memo(QACardListBox)
