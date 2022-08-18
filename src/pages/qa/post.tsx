import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    ListItem,
    Select,
    Spacer,
    Text,
    Textarea,
    UnorderedList,
    VStack,
} from '@chakra-ui/react'
import { BsChatRightText } from 'react-icons/bs'
import axios from 'axios'
import _ from 'lodash'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DefaultLayout from '../../components/common/DefaultLayout'
import QARequest from '../../types/api/req/qa/QARequest'
import QACategories from '../../groupObject/qa/qaCategories'
import Layout from '../../components/common/Layout'
import LeftBar from '../../components/common/LeftBar'
import RightBar from '../../components/common/RigthBar'
import Footer from '../../components/common/Footer'
import Question from '../../types/domain/qa/Question'

type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

interface categorySelectProps {
    isRequired: boolean
    categoryText: string
    onChange: void
    value: string
}

interface RequiredLabelProps {
    isRequired: boolean
}

const Post: NextPage = () => {
    const list1 = Object.values(QACategories)
    const list2 = _.cloneDeep(Object.values(QACategories))
    const [duplicateError, setDuplicateError] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<QARequest>()
    const [contentLength, setContentLength] = useState(0)
    const [question, setQuestion] = useState<Question>()
    const router = useRouter()
    const onChangeHandler = () => {
        setDuplicateError(false)
    }

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }
    const RequiredLabel = ({ isRequired }: RequiredLabelProps) => {
        const bgColor = isRequired ? 'mainColor' : 'gray.400'
        const text = isRequired ? '必須' : '任意'
        return (
            <Box as="span" bgColor={bgColor} color="white" fontWeight={'bold'} rounded="md" p="1" fontSize="sm">
                {text}
            </Box>
        )
    }
    const CategorySelecter1 = () => {
        return (
            <VStack w="full">
                <Box w="full">
                    <FormControl isInvalid={errors.category1 !== undefined}>
                        <FormLabel htmlFor="category1" fontSize={{ base: 'lg', md: 'xl' }}>
                            <HStack>
                                <Text>カテゴリ1</Text>
                                <RequiredLabel isRequired={true} />
                            </HStack>
                        </FormLabel>
                        <Select
                            required
                            placeholder="カテゴリを選択"
                            {...register('category1')}
                            onChange={onChangeHandler}
                        >
                            {list1.map((category) => {
                                return (
                                    <Box as="option" value={category} key={category}>
                                        {category}
                                    </Box>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </VStack>
        )
    }
    const CategorySelecter2 = () => {
        return (
            <VStack w="full">
                <Box w="full">
                    <FormControl isInvalid={errors.category2 !== undefined}>
                        <FormLabel htmlFor="category2" fontSize={{ base: 'lg', md: 'xl' }}>
                            <HStack>
                                <Text>カテゴリ2</Text>
                                <RequiredLabel isRequired={false} />
                            </HStack>
                        </FormLabel>
                        <Select placeholder="カテゴリを選択" {...register('category2')} onChange={onChangeHandler}>
                            {list2.map((category) => {
                                return (
                                    <Box as="option" value={category} key={category}>
                                        {category}
                                    </Box>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <Text color={'#E53E3E'} fontSize="14">
                        {duplicateError && 'カテゴリが重複しています'}
                    </Text>
                </Box>
            </VStack>
        )
    }
    const onSubmitHandler = async (data: QARequest) => {
        setDuplicateError(data.category1 === data.category2)
        if (data.category1 === data.category2) {
            return
        }
        console.log(data)
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        await axios
            .post(defaultUrl, data)
            .then((res) => {
                console.log(res.data)
                alert('質問を投稿しました')
                //router.push('/qa')
            })
            .catch((res) => {
                alert('質問の投稿に失敗しました')
            })
    }
    return (
        <Layout pageName={'質問の投稿'}>
            <HStack spacing="0px">
                <LeftBar />
                <VStack
                    w={{
                        base: '100%',
                        sm: '100vw',
                        md: 'calc(100vw - 210px)',
                        lg: 'calc(100vw - 210px)',
                        xl: 'calc(400px + 50vw)',
                    }}
                    paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
                >
                    <VStack w="full" p="5%">
                        <HStack w="full">
                            <Box as="span" boxSize="20px" bgColor="mainColor" rounded="full"></Box>
                            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                                質問の投稿
                            </Text>
                        </HStack>
                        <Box w="full" borderBottom="1px" borderTop="1px" py="2" borderColor="gray.300">
                            <UnorderedList>
                                <ListItem>誹謗中はお控え下さい</ListItem>
                                <ListItem>
                                    学生間での情報共有サービスですので、医療や法律などの
                                    <Box fontWeight={'bold'} as="span">
                                        専門的な知識
                                    </Box>
                                    を必要とする投稿はお控え下さい。
                                </ListItem>
                            </UnorderedList>
                        </Box>
                        <VStack as="form" onSubmit={handleSubmit(onSubmitHandler)} w="full">
                            <CategorySelecter1 />
                            <CategorySelecter2 />
                            <Box w="full">
                                <FormControl isInvalid={errors.title !== undefined}>
                                    <FormLabel htmlFor="title" fontSize={{ base: 'lg', md: 'xl' }}>
                                        <HStack>
                                            <Text>タイトル</Text>
                                            <RequiredLabel isRequired={true} />
                                        </HStack>
                                    </FormLabel>
                                    <Input
                                        {...register('title', {
                                            required: 'This is required',
                                            minLength: { value: 1, message: 'タイトルは最小1文字必要です' },
                                            maxLength: { value: 50, message: 'タイトルは50文字までです' },
                                        })}
                                    ></Input>
                                    <FormErrorMessage>{errors.title && 'タイトルを入力してください'}</FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box w="full">
                                <FormControl isInvalid={errors.content !== undefined}>
                                    <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>
                                        <HStack>
                                            <Text>内容</Text>
                                            <RequiredLabel isRequired={true} />
                                        </HStack>
                                    </FormLabel>
                                    <Textarea
                                        minH="48"
                                        {...register('content', {
                                            required: 'This is required',
                                            minLength: { value: 1, message: '質問は最小1文字必要です' },
                                            maxLength: { value: 5000, message: '質問本文は5000文字までです。' },
                                        })}
                                        onChange={countContent}
                                    ></Textarea>
                                </FormControl>
                                <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
                            </Box>
                            <HStack w="full">
                                <Text>{contentLength} / 5000</Text>
                            </HStack>
                            <HStack w="full">
                                <Button
                                    type="button"
                                    onClick={() => router.back()}
                                    color="mainColor"
                                    bgColor="white"
                                    borderWidth={1}
                                    borderColor="mainColor"
                                    _hover={{ bgColor: 'mainColor', color: 'white' }}
                                    w="50%"
                                >
                                    キャンセル
                                </Button>
                                <Button
                                    type="submit"
                                    color="white"
                                    bgColor="mainColor"
                                    _hover={{ bgColor: 'subSubColor' }}
                                    leftIcon={<BsChatRightText />}
                                    w="full"
                                >
                                    質問を投稿する
                                </Button>
                            </HStack>
                        </VStack>
                    </VStack>
                    <Footer />
                </VStack>

                <RightBar />
            </HStack>
        </Layout>
    )
}
export default Post
