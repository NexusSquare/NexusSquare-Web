import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Select,
    Spacer,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import _ from 'lodash'
import { NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DefaultLayout from '../../components/common/DefaultLayout'
import QARequest from '../../types/api/req/qa/qaRequest'
import QACategories from '../../groupObject/qa/qaCategories'

type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

interface categorySelectProps {
    isRequired: boolean
    categoryText: string
    onChange: void
    value: string
}

const Post: NextPage = () => {
    const list1 = Object.values(QACategories)
    const list2 = _.cloneDeep(Object.values(QACategories))
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<QARequest>()
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const router = useRouter()
    const [category1, setCategory1] = useState<string>()
    const [category2, setCategory2] = useState<string>()
    const onCategory1ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const nowCategory1 = e.target.value
        setCategory1(nowCategory1)
    }
    const onCategory2ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const nowCategory2 = e.target.value
        setCategory2(nowCategory2)
    }
    const CategorySelecter1 = () => {
        return (
            <VStack>
                <Box>
                    <FormControl isInvalid={errors.category1 !== undefined}>
                        <FormLabel htmlFor="category1">カテゴリ1</FormLabel>
                        <Select required placeholder="カテゴリを選択" {...register('category1')}>
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
            <VStack>
                <Box>
                    <FormControl isInvalid={errors.category2 !== undefined}>
                        <FormLabel htmlFor="category2">カテゴリ2</FormLabel>
                        <Select placeholder="カテゴリを選択" {...register('category2')}>
                            {list2.map((category) => {
                                return (
                                    <Box as="option" value={category} key={category}>
                                        {category}
                                    </Box>
                                )
                            })}
                        </Select>
                        <FormErrorMessage>{errors.category2 && errors.category2.message}</FormErrorMessage>
                    </FormControl>
                </Box>
            </VStack>
        )
    }
    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const nowTitle = e.target.value
        setTitle(nowTitle)
    }
    const onTextAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const nowText = e.target.value
        setContent(nowText)
    }
    const onSubmitHandler = async (data: QARequest) => {
        const defaultUrl: string = process.env.GET_QUESTION_URL
            ? process.env.GET_QUESTION_URL
            : 'http://localhost:4000/dev/question'
        await axios
            .post(defaultUrl, data)
            .then((res) => {
                console.log(res.data)
                alert('質問を投稿しました')
                router.push('/qa')
            })
            .catch((res) => {
                alert('質問の投稿に失敗しました')
            })
    }
    return (
        <DefaultLayout>
            <VStack>
                <Box>
                    <Text>質問の投稿</Text>
                </Box>
                <VStack as="form" onSubmit={handleSubmit(onSubmitHandler)}>
                    <CategorySelecter1 />
                    <CategorySelecter2 />
                    <Box>
                        <FormControl isInvalid={errors.title !== undefined}>
                            <FormLabel htmlFor="title">タイトル</FormLabel>
                            <Input
                                {...register('title', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'タイトルは最小1文字必要です' },
                                    maxLength: { value: 50, message: 'タイトルは50文字までです' },
                                })}
                            ></Input>
                            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl isInvalid={errors.content !== undefined}>
                            <FormLabel>内容</FormLabel>
                            <Textarea
                                {...register('content', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: '質問は最小1文字必要です' },
                                    maxLength: { value: 5000, message: '質問本文は5000文字までです。' },
                                })}
                            ></Textarea>
                        </FormControl>
                        <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
                    </Box>
                    <HStack>
                        <Input type="image"></Input>
                        <Spacer />
                        <Text>あと文字</Text>
                    </HStack>
                    <Box>
                        <Button type="button" onClick={() => router.back()}>
                            キャンセル
                        </Button>
                        <Button type="submit">質問を投稿する</Button>
                    </Box>
                </VStack>
            </VStack>
        </DefaultLayout>
    )
}
export default Post
