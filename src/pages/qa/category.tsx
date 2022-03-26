import { Box, Button, Checkbox, CheckboxProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Radio, RadioGroup, RadioGroupProps, Text, Wrap, WrapItem } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import QAListLayout from "../../components/qa/qaListLayout"
import QAResponse from "../../entity/qa/qaResponse"
import question from "../../entity/qa/question"
import QueryProps from "../../groupObject/qa/queryGroup"
import queryOptions from "../../groupObject/qa/queryOptions"
import React, { useState } from "react"
import QACategories from "../../groupObject/qa/qaCategories"
import { useEffect } from "react"
import { useCallback } from "react"

interface Props{
    content:question[],
    query:QueryProps
}
type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

const CategorySelect = (props:Props) => {
    const list = Object.values(QACategories)
    const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
    const url = defaultUrl + `?option=${queryOptions.notSolved}`
    const [displayData,setDisplayData] = useState<question[]>([])
    const [searchQuery,setSearchQuery] = useState<QueryProps>({})
    const [checkValue,setCheckValue] = useState<string>("")
    useEffect(
        () => {async() => { 
                const content:question[] = await axios.get(url)
                .then(
                (
                    res: AxiosResponse<QAResponse>) => {
                    const { data, status } = res
                    const resBody: question[] = data.data
                    return resBody
                    }
                ).catch(
                    ({error}) => {
                        const router = useRouter()
                        console.log(error)
                        router.replace("/500")
                        return error
                    }
                )
                setDisplayData(content)
            }
        },[searchQuery]
    )
    const onChangeHandler = (value: string) =>{
        setCheckValue(value)
        setSearchQuery({ sortby:value })
    } 

    const RadioButtonList = () => {
        return(

            <RadioGroup onChange={onChangeHandler} value={checkValue}>
                <Wrap>
                    {list.map((category) => {
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
        <QAListLayout pageName="カテゴリで絞り込む" data={displayData} query={searchQuery} >
            <Box h="100px" w="100%" textAlign="center">
                <Text paddingLeft="15%" fontSize="4xl" paddingTop="30px" textAlign="left">カテゴリで絞り込む</Text>
                <RadioButtonList />
            </Box>
        </QAListLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async() => {
    try{
        const defaultUrl:string = (process.env.GET_QUESTION_URL) ? process.env.GET_QUESTION_URL : 'http://localhost:4000/dev/question'
        const url = defaultUrl + `?option=${queryOptions.notSolved}`
        const response: AxiosResponse<QAResponse> = await axios.get(url)
        const { data,status } = response
        const props:Props = {
            content: data.data,
            query:{}
        }
        return { props }
    }catch(error){
        if(axios.isAxiosError(error)){
            console.error(error.message)
            return { notFound: true }
        }
    }
    return { notFound: true }
}
export default CategorySelect
