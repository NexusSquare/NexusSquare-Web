import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    Textarea,
    Select,
    VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChancelButton } from '../../../common/ChancelButton'
import { DefaultModal } from '../../../common/DefaultModal'
import { Question } from '../../../../types/domain/qa'
import QACategories from '../../../../constants/qa/qaCategories'
import { QuestionReq } from '../../../../types/api/req'
import { SecondaryButton } from '../../../common/SecondaryButton'
import { PrimaryButton } from '../../../common/PrimaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    question: Question
    onClickUpdateQuestion: (value: QuestionReq) => void
    isUpdateLoading: boolean
}

type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

export const EditFormModal = ({ isOpen, onClose, question, onClickUpdateQuestion, isUpdateLoading }: Props) => {
    const [contentLength, setContentLength] = useState(question.content.length)
    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<QuestionReq>()
    const watchCategory1 = watch('category1')
    const category1List = Object.values(QACategories)
    const [category2List, setCategory2List] = useState<string[]>([])

    // NOTE カテゴリー1が選択されるとカテゴリー2が生成される。
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
    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問を編集しますか？">
            <VStack w="full" as="form" onSubmit={handleSubmit((data) => onClickUpdateQuestion(data))} spacing={4} p="4">
                <FormControl isInvalid={errors.category1 !== undefined} isRequired>
                    <FormLabel fontWeight={'bold'} htmlFor="category1" fontSize={{ base: 'lg', md: 'lg' }}>
                        カテゴリ1
                    </FormLabel>
                    <Select
                        required
                        placeholder="カテゴリを選択"
                        {...register('category1')}
                        defaultValue={question.categories[0]}
                    >
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
                    <FormLabel
                        fontWeight={'bold'}
                        htmlFor="category2"
                        fontSize={{ base: 'lg', md: 'lg' }}
                        defaultValue={question.categories[1]}
                    >
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
                    <FormLabel fontWeight={'bold'} htmlFor="title" fontSize={{ base: 'lg', md: 'lg' }}>
                        タイトル
                    </FormLabel>
                    <Input
                        defaultValue={question.title}
                        {...register('title', {
                            required: 'This is required',
                            minLength: { value: 1, message: 'タイトルは最小1文字必要です' },
                            maxLength: { value: 50, message: 'タイトルは50文字までです' },
                        })}
                    ></Input>
                    <FormErrorMessage>{errors.title && 'タイトルを入力してください'}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.content !== undefined} isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                        内容
                    </FormLabel>
                    <Textarea
                        defaultValue={question.content}
                        minH="48"
                        {...register('content', {
                            required: 'This is required',
                            minLength: { value: 1, message: '質問は最小1文字必要です' },
                            maxLength: { value: 5000, message: '質問本文は5000文字までです。' },
                        })}
                        onChange={countContent}
                    ></Textarea>
                </FormControl>
                <HStack w="full">
                    <Text>{contentLength} / 5000</Text>
                </HStack>
                <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>

                <HStack w="full" justify={'end'}>
                    <SecondaryButton
                        type="button"
                        buttonText="キャンセル"
                        onClick={onClose}
                        disabled={isUpdateLoading}
                        isLoading={isUpdateLoading}
                    />
                    <PrimaryButton
                        buttonText="編集する"
                        type="submit"
                        disabled={isUpdateLoading}
                        isLoading={isUpdateLoading}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </DefaultModal>
    )
}
