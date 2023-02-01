import { Box, Button, Tab, TabList, TabPanel, TabPanels, VStack, Tabs, HStack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import QACard from '../../molecules/qa/QACard'
import { Question } from '../../../entities/qa'
import { QASkeleton } from '../../common/QASkeleton'
import { NoCards } from '../../common/NoCards'
import { STATUS } from '../../../constants/qa/status'

interface Props {
    questions: Question[]
    isLoading: boolean
    changeStatus: (value: QuestionStatus) => void
}
type QuestionStatus = keyof typeof STATUS

interface QASkeletonsProps {
    sheltonCount: number
}
interface QuestionTabItemProps {
    questions: Question[]
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

const QuestionTabItem: FC<QuestionTabItemProps> = ({ questions }) => {
    return (
        <>
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
                    <NoCards text="質問が見つかりませんでした。" />
                </>
            )}
        </>
    )
}

const QACardListBox = ({ questions, isLoading, changeStatus }: Props): JSX.Element => {
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
                    onClick={() => changeStatus(STATUS.SOLVED)}
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
                    onClick={() => changeStatus(STATUS.NOT_SOLVED)}
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
                <QASkeletons sheltonCount={3} />
            ) : (
                <>
                    <TabPanels>
                        <TabPanel padding="0px">
                            <QuestionTabItem questions={questions}></QuestionTabItem>
                        </TabPanel>
                        <TabPanel padding="0px">
                            <QuestionTabItem questions={questions}></QuestionTabItem>
                        </TabPanel>
                    </TabPanels>
                </>
            )}
        </Tabs>
    )
}

export default React.memo(QACardListBox)
