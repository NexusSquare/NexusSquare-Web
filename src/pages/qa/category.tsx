import {
    Box,
    Button,
    Checkbox,
    CheckboxProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Radio,
    RadioGroup,
    RadioGroupProps,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import QAListLayout from '../../components/qa/qaListLayout'
import QAResponse from '../../types/api/qa/qaResponse'
import question from '../../types/domain/qa/question'
import QAQueryProps from '../../groupObject/qa/queryGroup'
import queryOptions from '../../groupObject/qa/queryOptions'
import React, { useRef, useState } from 'react'
import QACategories from '../../groupObject/qa/qaCategories'
import { useEffect } from 'react'
import { useCallback } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { fetcherQuestion } from '../../repositories/qa/fetcherQuestion'

interface Props {
    content: question[]
    query: QAQueryProps
}
type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

const CategorySelect = (props: Props) => {
    const categoryList = Object.values(QACategories)
    const defaultUrl: string = process.env.GET_QUESTION_URL
        ? process.env.GET_QUESTION_URL
        : 'http://localhost:4000/dev/question'
    const [displayData, setDisplayData] = useState<question[]>(props.content)
    const [searchQuery, setSearchQuery] = useState<QAQueryProps>({ option: queryOptions.notSolved })
    const [checkValue, setCheckValue] = useState<string>('')

    const { data, error, mutate } = useSWR<question[]>(
        () => {
            const params = new URLSearchParams(searchQuery as string)
            return defaultUrl + `?option=${queryOptions.notSolved}&${params}`
        },
        fetcherQuestion,
        { revalidateOnMount: false }
    )

    useEffect(() => {
        console.log('not-soleved')
        data && setDisplayData(data)
    }, [data])

    const onChangeHandler = (value: string) => {
        setCheckValue(value)
        setSearchQuery({ ...searchQuery, category: value })
    }

    const RadioButtonList = () => {
        return (
            <RadioGroup onChange={onChangeHandler} value={checkValue}>
                <Wrap>
                    {categoryList.map((category) => {
                        return (
                            <WrapItem key={category}>
                                <Radio value={category}>{category}</Radio>
                            </WrapItem>
                        )
                    })}
                </Wrap>
            </RadioGroup>
        )
    }
    return (
        <QAListLayout pageName="カテゴリで絞り込む" data={displayData} query={searchQuery}>
            <Box h="100px" w="100%" display="flex" justifyContent="center" flexDirection="column">
                <Text paddingLeft={{ base: '5%', md: '10%' }} fontSize="4xl" textAlign="left">
                    カテゴリで絞り込む
                </Text>
                <RadioButtonList />
            </Box>
        </QAListLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data, status } = response
        const props: Props = {
            content: data.data,
            query: { option: queryOptions.notSolved },
        }
        return { props }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message)
            return { notFound: true }
        }
    }
    return { notFound: true }
}
export default CategorySelect
