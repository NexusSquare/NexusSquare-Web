import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useRadio,
    useRadioGroup,
} from '@chakra-ui/react'
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ReactNode } from 'react'
import QACard from './qaCard'
import question from '../../types/domain/qa/question'
import queryOptions from '../../groupObject/qa/queryOptions'
import QAResponse from '../../types/api/qa/qaResponse'
import QAQueryProps from '../../groupObject/qa/queryGroup'
import { useRouter } from 'next/router'

interface Props {
    children?: ReactNode
    query?: QAQueryProps
    data: question[]
}
type queryOptionType = typeof queryOptions
type queryOptions = typeof queryOptions[keyof queryOptionType]

const QACardListBox = ({ children, query, data }: Props): JSX.Element => {
    const [notSolvedQACardsData, setNotSolvedQACardsData] = useState<question[]>([])
    const [solvedQACardsData, setSolvedQACardsData] = useState<question[]>([])
    const [primeQACardsData, setPrimeQACardsData] = useState<question[]>([])
    const [queryOption, setQueryOption] = useState<queryOptions>(queryOptions.notSolved)
    const defaultUrl: string = process.env.GET_QUESTION_URL
        ? process.env.GET_QUESTION_URL
        : 'http://localhost:4000/dev/question'
    const router = useRouter()

    const fetchSolvedQuestion = async (queryOption: queryOptions, query?: QAQueryProps) => {
        const params = new URLSearchParams(query as string)
        const url = defaultUrl + `?option=${queryOption}&${params}`
        await axios
            .get(url)
            .then((res: AxiosResponse<QAResponse>) => {
                const { data, status } = res
                setSolvedQACardsData(data.data)
            })
            .catch((error) => {
                router.replace('/500')
                return error
            })
    }

    const fetchPrimeQuestion = async (queryOption: queryOptions, query?: QAQueryProps) => {
        const params = new URLSearchParams(query as string)
        const url = defaultUrl + `?option=${queryOption}?${params}`
        await axios
            .get(url)
            .then((res: AxiosResponse<QAResponse>) => {
                const { data, status } = res
                setPrimeQACardsData(data.data)
            })
            .catch((error) => {
                router.replace('/500')
                return error
            })
    }

    useEffect(() => {
        switch (queryOption) {
            case 'solved':
                fetchSolvedQuestion(queryOption, query)
                break
            case 'not-solved':
                setNotSolvedQACardsData(data)
                break
            case 'prime':
                fetchPrimeQuestion(queryOption, query)
                break
        }
        //console.log("first fetch")
    }, [query, data, queryOption])
    const onNotSolvedClickHandler = () => {
        setQueryOption(queryOptions.notSolved)
    }
    const onSolvedClickHandler = () => {
        setQueryOption(queryOptions.solved)
    }
    const onPrimeClickHandler = () => {
        setQueryOption(queryOptions.prime)
    }

    const NotSolvedQACardList: Function = useCallback(() => {
        if (!Array.isArray(notSolvedQACardsData)) {
            return <Box>読み込みに失敗しました</Box>
        } else if (notSolvedQACardsData.length < 1) {
            return <Box>この質問への回答はまだありません</Box>
        }
        return notSolvedQACardsData.map((qaCardData: question) => {
            return (
                <QACard
                    key={qaCardData.id}
                    id={qaCardData.id}
                    category1={qaCardData.category1}
                    category2={qaCardData.category2}
                    createAt={qaCardData.createAt}
                    title={qaCardData.title}
                    postedBy={qaCardData.postedBy}
                    content={qaCardData.content}
                    ansNum={qaCardData.ansNum}
                />
            )
        })
    }, [notSolvedQACardsData])
    const SolvedQACardList: Function = useCallback(() => {
        if (!Array.isArray(solvedQACardsData)) {
            return <Box>読み込みに失敗しました</Box>
        } else if (solvedQACardsData.length < 1) {
            return <Box>この質問への回答はまだありません</Box>
        }
        return solvedQACardsData.map((qaCardData: question) => {
            return (
                <QACard
                    key={qaCardData.id}
                    id={qaCardData.id}
                    category1={qaCardData.category1}
                    category2={qaCardData.category2}
                    createAt={qaCardData.createAt}
                    title={qaCardData.title}
                    postedBy={qaCardData.postedBy}
                    content={qaCardData.content}
                    ansNum={qaCardData.ansNum}
                />
            )
        })
    }, [solvedQACardsData])
    const PrimeQACardList: Function = useCallback(() => {
        if (!Array.isArray(primeQACardsData)) {
            return <Box>読み込みに失敗しました</Box>
        } else if (primeQACardsData.length < 1) {
            return <Box>この質問への回答はまだありません</Box>
        }
        return primeQACardsData.map((qaCardData: question) => {
            return (
                <QACard
                    key={qaCardData.id}
                    id={qaCardData.id}
                    category1={qaCardData.category1}
                    category2={qaCardData.category2}
                    createAt={qaCardData.createAt}
                    title={qaCardData.title}
                    postedBy={qaCardData.postedBy}
                    content={qaCardData.content}
                    ansNum={qaCardData.ansNum}
                />
            )
        })
    }, [primeQACardsData])
    return (
        <Tabs w="100%" isLazy defaultIndex={1}>
            <TabList>
                <Tab
                    w="33.3%"
                    border="1px"
                    color="gray.400"
                    bgColor="gray.200"
                    borderRadius="5px"
                    fontSize={{ base: 'lg', sm: '2xl' }}
                    onClick={onSolvedClickHandler}
                    _selected={{
                        bgColor: 'white',
                        borderColor: 'gray.400',
                        borderBottomColor: '#3DB2FF',
                        borderBottomWidth: '5px',
                        color: 'black',
                    }}
                    _active={{ outline: 'none' }}
                    _focus={{ outline: 'none' }}
                >
                    解決済み
                </Tab>
                <Tab
                    w="33.4%"
                    border="1px"
                    color="gray.400"
                    bgColor="gray.200"
                    borderRadius="5px"
                    fontSize={{ base: 'lg', sm: '2xl' }}
                    onClick={onNotSolvedClickHandler}
                    _selected={{
                        bgColor: 'white',
                        borderColor: 'gray.400',
                        borderBottomColor: '#3DB2FF',
                        borderBottomWidth: '5px',
                        color: 'black',
                    }}
                    _active={{ outline: 'none' }}
                    _focus={{ outline: 'none' }}
                >
                    回答募集中
                </Tab>
                <Tab
                    w="33.3%"
                    border="1px"
                    color="gray.400"
                    bgColor="gray.200"
                    borderRadius="5px"
                    fontSize={{ base: 'lg', sm: '2xl' }}
                    onClick={onPrimeClickHandler}
                    _selected={{
                        bgColor: 'white',
                        borderColor: 'gray.400',
                        borderBottomColor: '#3DB2FF',
                        borderBottomWidth: '5px',
                        color: 'black',
                    }}
                    _active={{ outline: 'none' }}
                    _focus={{ outline: 'none' }}
                >
                    回答急募
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel padding="0px">
                    <SolvedQACardList />
                    <Box w="100%" textAlign="center">
                        <Button w="100%">さらに読み込む</Button>
                    </Box>
                </TabPanel>
                <TabPanel padding="0px">
                    <NotSolvedQACardList />
                </TabPanel>
                <TabPanel padding="0px">
                    <PrimeQACardList />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default React.memo(QACardListBox)
