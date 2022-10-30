import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    ModalBody,
    ModalFooter,
    Text,
    Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnswerReq } from '../../../../types/api/req'
import { Question } from '../../../../types/domain/qa'
import { DefaultModal } from '../../../common/DefaultModal'
import { PrimaryButton } from '../../../common/PrimaryButton'
import { SecondaryButton } from '../../../common/SecondaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    question: Question
    isPostLoading: boolean
    postAnswer: (value: AnswerReq) => Promise<void>
}
export const PostFormModal = ({ isOpen, onClose, question, isPostLoading, postAnswer }: Props) => {
    const [contentLength, setContentLength] = useState(0)
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<AnswerReq>({
        reValidateMode: 'onChange',
        defaultValues: {
            content: '',
            questionId: question.questionId,
            questionTitle: question.title,
        },
    })

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }

    const onSubmitAnswer = async (answer: AnswerReq) => {
        await postAnswer(answer)
        resetField('content')
        setContentLength(0)
    }

    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
            <Box w="full" as="form" onSubmit={handleSubmit((data) => onSubmitAnswer(data))}>
                <ModalBody>
                    <FormControl isInvalid={errors.content !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                            内容
                        </FormLabel>
                        <Textarea
                            minH="48"
                            {...register('content', {
                                required: 'This is required',
                                minLength: { value: 1, message: '回答は最小1文字必要です' },
                                maxLength: { value: 5000, message: '回答本文は5000文字までです。' },
                            })}
                            onChange={countContent}
                        ></Textarea>
                    </FormControl>
                    <HStack w="full">
                        <Text>{contentLength} / 5000</Text>
                    </HStack>
                    <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <SecondaryButton
                            buttonText="キャンセル"
                            onClick={onClose}
                            isLoading={isPostLoading}
                            disabled={isPostLoading}
                            type="button"
                        />
                        <PrimaryButton
                            buttonText="回答する"
                            isLoading={isPostLoading}
                            disabled={isPostLoading}
                            type="submit"
                        ></PrimaryButton>
                    </HStack>
                </ModalFooter>
            </Box>
        </DefaultModal>
    )
}
