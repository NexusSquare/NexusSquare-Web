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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnswerReq } from '../../types/api/req'
import { Question } from '../../types/domain/qa'
import { DefaultModal } from '../common/DefaultModal'
import { PrimaryButton } from '../common/PrimaryButton'
import { SecondaryButton } from '../common/SecondaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    question: Question
    isPostLoading: boolean
    onClickPost: (value: AnswerReq) => Promise<void>
}
export const PostFormModal = ({ isOpen, onClose, question, isPostLoading, onClickPost }: Props) => {
    const [contentLength, setContentLength] = useState(0)
    const {
        register,
        handleSubmit,
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
    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
            <Box w="full" as="form" onSubmit={handleSubmit((data) => onClickPost(data))}>
                <ModalBody>
                    <FormControl isInvalid={errors.content !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                            内容
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
