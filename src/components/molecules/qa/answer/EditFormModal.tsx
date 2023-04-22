import {
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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from '../../../common/Modal'
import { AnswerReq } from '../../../../api/req'
import { SecondaryButton } from '../../../common/Button/SecondaryButton'
import { PrimaryButton } from '../../../common/Button/PrimaryButton'
import { Answer } from '../../../../entities/qa/Answer'

interface Props {
    isOpen: boolean
    onClose: () => void
    answer: Answer
    onClickUpdate: (value: AnswerReq) => void
    isUpdateLoading: boolean
}

export const EditFormModal = ({ isOpen, onClose, answer, onClickUpdate, isUpdateLoading }: Props) => {
    const [contentLength, setContentLength] = useState(answer.content.length)
    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<AnswerReq>()

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }

    // NOTE: モダールを閉じた時に、デフォルト値がリセットされないため使用
    const resetFiledAll = () => {
        resetField('content')
    }

    const onCloseModal = () => {
        onClose()
        resetFiledAll()
    }
    return (
        <Modal isOpen={isOpen} onClose={onCloseModal} title="回答を編集しますか？">
            <VStack w="full" as="form" onSubmit={handleSubmit((data) => onClickUpdate(data))} spacing={4} p="4">
                <FormControl isInvalid={errors.content !== undefined} isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                        内容
                    </FormLabel>
                    <Textarea
                        defaultValue={answer.content}
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

                <HStack w="full" justify={'end'}>
                    <SecondaryButton
                        type="button"
                        buttonText="キャンセル"
                        onClick={onCloseModal}
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
        </Modal>
    )
}
