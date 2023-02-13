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
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import { BsChatText } from 'react-icons/bs'
import _ from 'lodash'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { useUser } from '../../../../store/atom'
import { usePostQuestion } from '../../../../hooks/question'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { QuestionReq } from '../../../../api/req'
import QACategories from '../../../../constants/qa/qaCategories'
import { validators } from '../../../../lib/validator/Validators'
import { useInfoToast } from '../../../../hooks/toast/useInfoToast'
import { ContentsLayout } from '../../../layouts/ContentsLayout'
import { LeftBar } from '../../../layouts/LeftBar'

type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

export const PostPage = (): JSX.Element => {
    const { user: postUser } = useUser()
    const { mutate: postQuestion, isLoading, cacheClearQuestion } = usePostQuestion()
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors },
    } = useForm<QuestionReq>()
    const watchCategory1 = watch('category1')
    const category1List = Object.values(QACategories)
    const [category2List, setCategory2List] = useState<string[]>([])
    const [contentLength, setContentLength] = useState(0)
    const router = useRouter()
    const errorToast = useErrorToast()
    const infoToast = useInfoToast()

    //　NOTE　カテゴリー1が選択されるとカテゴリー2が生成される。
    useEffect(() => {
        resetField('category2')
        setCategory2List([...category1List.filter((category) => category !== watchCategory1)])
        return () => {
            setCategory2List([])
        }
    }, [watchCategory1])

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }
    const onSuccessPostQuestion = async () => {
        if (!postUser) return
        await cacheClearQuestion(postUser.userId)
        infoToast('質問を投稿しました。')
        router.push(PAGE_LINKS.QA.URL)
    }
    const onSubmitQuestion = async (questionReq: QuestionReq) => {
        if (!postUser) return
        // NOTE FireStoreの仕様上、Userを渡す
        postQuestion(
            { questionReq, postUser },
            {
                onSuccess: onSuccessPostQuestion,
                onError: () => errorToast(ERROR_MESSAGE.SERVER),
            }
        )
    }

    return (
        <ContentsLayout Left={<LeftBar />}>
            <VStack w="full" px={4} py={6} spacing={4}>
                <HStack w="full">
                    <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                        質問の投稿
                    </Text>
                </HStack>
                <Box w="full" borderBottom="1px" borderTop="1px" py="2" borderColor="gray.300">
                    <UnorderedList>
                        <ListItem>誹謗中傷はお控え下さい</ListItem>
                        <ListItem>
                            学生間での情報共有サービスですので、医療や法律などの
                            <Box fontWeight={'bold'} as="span">
                                専門的な知識
                            </Box>
                            を必要とする投稿はお控え下さい。
                        </ListItem>
                    </UnorderedList>
                </Box>
                <VStack as="form" onSubmit={handleSubmit(onSubmitQuestion)} w="full" spacing={8}>
                    <FormControl isInvalid={errors.category1 !== undefined} isRequired>
                        <FormLabel htmlFor="category1" fontSize={{ base: 'lg', md: 'lg' }}>
                            カテゴリ1
                        </FormLabel>
                        <Select required placeholder="カテゴリを選択" {...register('category1')}>
                            {category1List.map((category) => {
                                return (
                                    <Box as="option" value={category} key={category}>
                                        {category}
                                    </Box>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl isInvalid={errors.category2 !== undefined}>
                        <FormLabel htmlFor="category2" fontSize={{ base: 'lg', md: 'lg' }}>
                            カテゴリ2
                        </FormLabel>
                        <Select placeholder="カテゴリを選択" {...register('category2')}>
                            {category2List.map((category) => {
                                return (
                                    <Box as="option" value={category} key={category}>
                                        {category}
                                    </Box>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl isInvalid={errors.title !== undefined} isRequired>
                        <FormLabel htmlFor="title" fontSize={{ base: 'lg', md: 'lg' }}>
                            タイトル
                        </FormLabel>
                        <Input
                            {...register('title', {
                                validate: {
                                    text: validators.requiredForText('タイトル'),
                                    maxLength: validators.requiredMaxLength('タイトル', 50),
                                    // minLength: validators.requiredMaxLength('タイトル', 1),
                                },
                            })}
                        ></Input>
                        <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.content !== undefined} isRequired>
                        <FormLabel fontSize={{ base: 'lg', md: 'lg' }}>内容</FormLabel>
                        <Textarea
                            minH="48"
                            {...register('content', {
                                validate: {
                                    text: validators.requiredForText('質問'),
                                    maxLength: validators.requiredMaxLength('質問', 5000),
                                    // minLength: validators.requiredMaxLength('質問', 1),
                                },
                            })}
                            onChange={countContent}
                        ></Textarea>
                        <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
                    </FormControl>

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
                            disabled={isLoading}
                            borderRadius={'sm'}
                        >
                            キャンセル
                        </Button>
                        <Button
                            type="submit"
                            color="white"
                            bgColor="mainColor"
                            _hover={{ bgColor: 'subSubColor' }}
                            leftIcon={<BsChatText />}
                            w="full"
                            isLoading={isLoading}
                            disabled={isLoading}
                            borderRadius={'sm'}
                        >
                            質問を投稿する
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </ContentsLayout>
    )
}
