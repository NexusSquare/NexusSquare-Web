/* eslint-disable react/display-name */
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
    Select,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import QAListLayout from '../../components/qa/QAListLayout'
import QAResponse from '../../types/api/res//qa/qaResponse'
import Question from '../../types/domain/qa/Question'
import QAQueryProps from '../../groupObject/qa/queryGroup'
import queryOptions from '../../groupObject/qa/queryOptions'
import React, { useRef, useState, useMemo, memo } from 'react'
import QACategories from '../../groupObject/qa/qaCategories'
import QARequest from '../../types/api/req/qa/QARequest'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import useSWR, { mutate, useSWRConfig } from 'swr'
import { fetcherQuestion } from '../../repositories/qa/fetcherQuestion'
import { values } from 'lodash'

interface Props {
    content: Question[]
    query: QAQueryProps
}
type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

const CategorySelect = (props: Props) => {
    const categoryList = Object.values(QACategories)
    const defaultUrl: string = process.env.GET_QUESTION_URL
        ? process.env.GET_QUESTION_URL
        : 'http://localhost:4000/dev/question'
    const [displayData, setDisplayData] = useState<Question[]>(props.content)
    const [searchQuery, setSearchQuery] = useState<QAQueryProps>({ option: queryOptions.notSolved })
    const [category, setCategory] = useState('')

    const { data, error, mutate } = useSWR<Question[]>(
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

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const checkedCategory = e.target.value
        setCategory(checkedCategory)
        setSearchQuery({ ...searchQuery, category: checkedCategory })
    }

    const SelectBox = () => {
        return (
            <VStack align={'center'}>
                <Select width={'80%'} value={category} onChange={onChangeHandler}>
                    <Box as="option" disabled value={''}>
                        カテゴリーを選択してください
                    </Box>
                    {categoryList.map((category) => {
                        return (
                            <Box as="option" value={category} key={category}>
                                {category}
                            </Box>
                        )
                    })}
                </Select>
            </VStack>
        )
    }
    return (
        <QAListLayout pageName="カテゴリで絞り込む" data={displayData} query={searchQuery}>
            <Box h="100px" w="100%" display="flex" justifyContent="center" flexDirection="column">
                <Text paddingLeft={{ base: '5%', md: '10%' }} fontSize="4xl" textAlign="left">
                    カテゴリで絞り込む
                </Text>
                <SelectBox />
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
